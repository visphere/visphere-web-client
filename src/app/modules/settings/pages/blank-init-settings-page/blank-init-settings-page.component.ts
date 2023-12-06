/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '~/env/environment';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-blank-init-settings-page',
  templateUrl: './blank-init-settings-page.component.html',
})
export class BlankInitSettingsPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  path = environment.contentDistributorBaseUrl;
  landingPagePath = environment.baseLandingUrl;

  constructor(
    private readonly _languageSwitcherService: LanguageSwitcherService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._languageSwitcherService.selectedLang$
    ).subscribe(lang => {
      this.landingPagePath = `${environment.baseLandingUrl}${lang.landingPrefix}`;
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
