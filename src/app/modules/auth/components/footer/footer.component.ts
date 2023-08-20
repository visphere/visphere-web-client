/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: footer.component.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 21:00:01
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { environment } from '~/env/environment';
import { LanguageSwitcherService } from '~/root-mod/modules/shared/services/language-switcher/language-switcher.service';
import { ThemeSwitcherService } from '~/root-mod/modules/shared/services/theme-switcher/theme-switcher.service';
import { AbstractReactiveProvider } from '~/root-mod/modules/shared/utils/abstract-reactive-provider';

@Component({
  selector: 'msph-footer',
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
    this._themeSwitcherService.selectedTheme$
      .pipe(takeUntil(this._subscriptionHook))
      .subscribe(theme => {
        this.copyLogoImagePath = this._themeSwitcherService.isDarkMode(theme)
          ? 'moonsphere-light-small-variant-2.svg'
          : 'moonsphere-dark-small-variant-2.svg';
      });
    this._languageSwitcherService.selectedLang$
      .pipe(takeUntil(this._subscriptionHook))
      .subscribe(lang => {
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
