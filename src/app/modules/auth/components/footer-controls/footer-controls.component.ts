/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: footer-controls.component.ts
 *   Created at: 2023-08-06, 18:55:38
 *   Last updated at: 2023-08-10, 23:53:03
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This is a project
 * completing a engineers degree in computer science at Silesian University of Technology.
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

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '~/env/environment';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';
import { IThemeModeType } from '~/shared-mod/types/theme-mode.type';
import { ITranslation } from '~/shared-mod/types/translation.type';

@Component({
  selector: 'msph-footer-controls',
  templateUrl: './footer-controls.component.html',
  host: { class: 'flex w-full gap-3 text-sm font-normal' },
})
export class FooterControlsComponent {
  path = environment.contentDistributorBaseUrl;

  traslations: ITranslation[] = this._languageSwitcherService.availableLangs;
  selectedLang$: Observable<ITranslation> =
    this._languageSwitcherService.selectedLang$;

  themes: IThemeModeType[] = this._themeSwitcherService.availableThemes;
  selectedTheme$: Observable<IThemeModeType> =
    this._themeSwitcherService.selectedTheme$;

  constructor(
    private readonly _themeSwitcherService: ThemeSwitcherService,
    private readonly _languageSwitcherService: LanguageSwitcherService
  ) {}

  handleChangeLang(translation: ITranslation): void {
    this._languageSwitcherService.changeLang(translation);
  }

  handleChangeTheme(theme: IThemeModeType): void {
    this._themeSwitcherService.changeTheme(theme.id);
  }
}
