/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { environment } from '~/env/environment';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  path = environment.contentDistributorBaseUrl;
  landingPagePath = environment.baseLandingUrl;

  currYear = Date.now();
  copyLogoImagePath = '';

  constructor(
    private readonly _themeSwitcherService: ThemeSwitcherService,
    private readonly _languageSwitcherService: LanguageSwitcherService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      combineLatest([
        this._themeSwitcherService.selectedTheme$,
        this._languageSwitcherService.selectedLang$,
      ])
    ).subscribe(([theme, lang]) => {
      this.copyLogoImagePath = this._themeSwitcherService.isDarkMode(theme)
        ? 'vsph-small-light.svg'
        : 'vsph-small-dark.svg';
      this.landingPagePath = `${environment.baseLandingUrl}${lang.landingPrefix}`;
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleLinkClick(): void {
    window.scrollTo(0, 0);
  }
}
