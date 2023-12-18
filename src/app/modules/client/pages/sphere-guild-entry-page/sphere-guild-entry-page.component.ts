/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GuildDetailsResDto } from '~/client-mod/model/guild.model';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import * as NgrxAction_CLN from '~/client-mod/store/actions';
import { ClientReducer } from '~/client-mod/types/ngx-store.type';
import { environment } from '~/env/environment';
import { AbstractIconThemeProvider } from '~/shared-mod/components/abstract-icon-theme-provider';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';

@Component({
  selector: 'vsph-sphere-guild-entry-page',
  templateUrl: './sphere-guild-entry-page.component.html',
  host: { class: 'vsph-center-content__container' },
})
export class SphereGuildEntryPageComponent
  extends AbstractIconThemeProvider
  implements OnInit, OnDestroy
{
  guildDetails?: GuildDetailsResDto;

  readonly path = environment.contentDistributorBaseUrl;
  readonly defaultPrefix = 'vsph.clientCommon.guild.startScreen';

  constructor(
    _themeSwitcherService: ThemeSwitcherService,
    private readonly _store: Store<ClientReducer>,
    private readonly _router: Router,
    private readonly _guildService: GuildService
  ) {
    super(_themeSwitcherService);
  }

  ngOnInit(): void {
    this.loadBrandThemedIcon();
    this.wrapAsObservable$(this._guildService.guildDetails$).subscribe(
      guildDetails => (this.guildDetails = guildDetails)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleOpenModalToCreateTextChannel(): void {
    this._store.dispatch(
      NgrxAction_CLN.__openSelectedModal({ modal: 'add-text-channel' })
    );
  }

  async handleGotoSphereSettings(): Promise<void> {
    this._store.dispatch(
      NgrxAction_SHA.__setSettingsReturnUrl({ url: this._router.url })
    );
    await this._router.navigateByUrl(
      `/settings/guild/${this.guildDetails?.id}/overview`
    );
  }
}
