/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from '~/env/environment';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import * as NgrxSelector_SHA from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  host: { class: 'min-w-[220px] me-4' },
})
export class NavigationBarComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  landingPagePath = environment.baseLandingUrl;

  settingsReturnUrl$: Observable<string> = this._store.select(
    NgrxSelector_SHA.selectSettingsReturnUrl
  );

  constructor(
    private readonly _languageSwitcherService: LanguageSwitcherService,
    private readonly _location: Location,
    private readonly _store: Store<SharedReducer>
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable(
      this._languageSwitcherService.selectedLang$
    ).subscribe(lang => {
      this.landingPagePath = `${environment.baseLandingUrl}${lang.landingPrefix}`;
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleOpenLogoutModal(): void {
    console.log('open logout modal');
  }
}
