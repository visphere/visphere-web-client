/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GuildOwnerDetailsResDto } from '~/settings-mod/model/guild-management.model';
import { DevastateModalData } from '~/settings-mod/model/user-account-details.model';
import { SphereGuildService } from '~/settings-mod/services/sphere-guild/sphere-guild.service';
import { PasswordConfirmationService } from '~/shared-mod/services/password-confirmation/password-confirmation.service';
import { selectSettingsReturnUrl } from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-guild-settings-entry-point-page',
  templateUrl: './guild-settings-entry-point-page.component.html',
  providers: [PasswordConfirmationService, SphereGuildService],
})
export class GuildSettingsEntryPointPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  guildDetails?: GuildOwnerDetailsResDto;
  isModalActive = false;

  readonly defaultPrefix =
    'vsph.clientCommon.settingsPage.category.guildSettings';
  readonly modalPrefix =
    'vsph.clientCommon.settingsPage.modal.devastate.deleteGuild';

  settingsReturnUrl$ = this._store.select(selectSettingsReturnUrl);

  constructor(
    private readonly _store: Store<SharedReducer>,
    private readonly _route: ActivatedRoute,
    private readonly _sphereGuildService: SphereGuildService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this._sphereGuildService.loadGuildDetails$(this._route).subscribe({
      next: guildDetails => (this.guildDetails = guildDetails),
      error: async () => await this._router.navigateByUrl('/'),
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleToggleModalToDeleteGuild(isActive: boolean): void {
    this.isModalActive = isActive;
  }

  handleDeleteGuild({ passwordOrMfaCode }: DevastateModalData): void {
    if (this.guildDetails?.id) {
      this.wrapAsObservable$(
        this._sphereGuildService.deleteGuild$(
          this.guildDetails?.id,
          passwordOrMfaCode
        )
      ).subscribe({ next: async () => await this._router.navigateByUrl('/') });
    }
  }
}
