/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as NgrxAction_CLN from '~/client-mod/store/actions';
import { ClientReducer } from '~/client-mod/types/ngx-store.type';
import { environment } from '~/env/environment';
import { AbstractLandingUrlProvider } from '~/shared-mod/components/abstract-landing-url-provider';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';

@Component({
  selector: 'vsph-app-entry-point-page',
  templateUrl: './app-entry-point-page.component.html',
  host: { class: 'vsph-center-content__container w-full' },
})
export class AppEntryPointPageComponent
  extends AbstractLandingUrlProvider
  implements OnInit, OnDestroy
{
  path = environment.contentDistributorBaseUrl;

  readonly defaultPrefix = 'vsph.clientCommon.client.welcomeBlock';

  constructor(
    _themeSwitcherService: ThemeSwitcherService,
    _languageSwitcherService: LanguageSwitcherService,
    private readonly _store: Store<ClientReducer>
  ) {
    super(_themeSwitcherService, _languageSwitcherService);
  }

  ngOnInit(): void {
    this.loadLandingUrl();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleOpenModalToCreateGuild(): void {
    this._store.dispatch(
      NgrxAction_CLN.__openSelectedModal({ modal: 'add-sphere' })
    );
  }
}
