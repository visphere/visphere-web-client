/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy } from '@angular/core';
import { AbstractLandingUrlProvider } from '~/shared-mod/components/abstract-landing-url.provider';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';

@Component({
  selector: 'vsph-not-found-page',
  templateUrl: './not-found-page.component.html',
  host: { class: 'flex' },
})
export class NotFoundPageComponent
  extends AbstractLandingUrlProvider
  implements OnDestroy
{
  constructor(
    _themeSwitcherService: ThemeSwitcherService,
    _languageSwitcherService: LanguageSwitcherService
  ) {
    super(_themeSwitcherService, _languageSwitcherService);
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
