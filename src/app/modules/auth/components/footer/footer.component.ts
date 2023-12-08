/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractLandingUrlProvider } from '~/root-mod/modules/shared/components/abstract-landing-url-provider';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';

@Component({
  selector: 'vsph-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent
  extends AbstractLandingUrlProvider
  implements OnInit, OnDestroy
{
  currYear = Date.now();

  constructor(
    _themeSwitcherService: ThemeSwitcherService,
    _languageSwitcherService: LanguageSwitcherService
  ) {
    super(_themeSwitcherService, _languageSwitcherService);
  }

  ngOnInit(): void {
    this.loadBrandThemedIcon();
    this.loadLandingUrl();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleLinkClick(): void {
    window.scrollTo(0, 0);
  }
}
