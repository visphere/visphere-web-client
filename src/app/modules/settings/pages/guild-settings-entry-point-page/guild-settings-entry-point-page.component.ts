/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PasswordConfirmationService } from '~/settings-mod/services/password-confirmation/password-confirmation.service';
import { SphereGuildService } from '~/settings-mod/services/sphere-guild/sphere-guild.service';
import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';
import * as NgrxSelector_SHA from '~/shared-mod/store/selectors';
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
  guildName = '{{Sphere guild name}}';
  isModalActive = false;
  guildId?: number;

  readonly defaultPrefix =
    'vsph.clientCommon.settingsPage.category.guildSettings';
  readonly modalPrefix =
    'vsph.clientCommon.settingsPage.modal.devastate.deleteGuild';

  settingsReturnUrl$ = this._store.select(
    NgrxSelector_SHA.selectSettingsReturnUrl
  );

  constructor(
    private readonly _store: Store<SharedReducer>,
    private readonly _route: ActivatedRoute,
    private readonly _formHelperService: FormHelperService,
    private readonly _sphereGuildService: SphereGuildService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.guildId = this._formHelperService.extractNumberValueParam(
      this._route,
      'guildId'
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleToggleModalToDeleteGuild(isActive: boolean): void {
    this.isModalActive = isActive;
  }

  handleDeleteGuild(passwordOrMfaCode: string): void {
    if (this.guildId) {
      this.wrapAsObservable$(
        this._sphereGuildService.deleteGuild$(this.guildId, passwordOrMfaCode)
      ).subscribe({ next: async () => await this._router.navigateByUrl('/') });
    }
  }
}
