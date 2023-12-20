/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { environment } from '~/env/environment';
import { GuildBannedUser } from '~/settings-mod/model/guild-bans.model';
import { GuildBansService } from '~/settings-mod/services/guild-bans/guild-bans.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-guild-bans-settings-page',
  templateUrl: './guild-bans-settings-page.component.html',
  providers: [GuildBansService],
})
export class GuildBansSettingsPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  bannedUsers: GuildBannedUser[] = [];
  isUnbanUserModalActive = false;
  unbanningUser?: GuildBannedUser;

  isFetching$ = this._guildBansService.isFetching$;

  readonly path = environment.contentDistributorBaseUrl;
  readonly defaultPrefix =
    'vsph.clientCommon.settingsPage.category.guildSettings.subpage.bans';
  readonly tooltipProps: NgxTippyProps = {
    placement: 'bottom',
    theme: 'vsph-auth',
    animation: 'scale-subtle',
  };

  constructor(
    private readonly _guildBansService: GuildBansService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._guildBansService.fetchAllBannedUsers$()
    ).subscribe({
      next: bannedUsers => (this.bannedUsers = bannedUsers),
      error: async () => await this._router.navigateByUrl('/'),
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleToggleModalToUnbanUser(
    isOpen: boolean,
    user: GuildBannedUser | undefined
  ): void {
    this.unbanningUser = user;
    this.isUnbanUserModalActive = isOpen;
  }

  handleUnbanUser(): void {
    if (this.unbanningUser) {
      this.wrapAsObservable$(
        this._guildBansService.unbanUser$(this.unbanningUser.id)
      ).subscribe({ next: () => (this.isUnbanUserModalActive = false) });
    }
  }
}
