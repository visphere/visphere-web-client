/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { environment } from '~/env/environment';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';
import { ThemeModeType } from '~/shared-mod/types/theme-mode.type';
import { TranslationRow } from '~/shared-mod/types/translation.type';

@Component({
  selector: 'vsph-footer-controls',
  templateUrl: './footer-controls.component.html',
  host: {
    class:
      'flex w-full gap-3 justify-center sm:justify-start text-sm font-normal',
  },
})
export class FooterControlsComponent {
  path = environment.contentDistributorBaseUrl;

  traslations = this._languageSwitcherService.availableLangs;
  selectedLang$ = this._languageSwitcherService.selectedLang$;

  themes = this._themeSwitcherService.availableThemes;
  selectedTheme$ = this._themeSwitcherService.selectedTheme$;

  constructor(
    private readonly _themeSwitcherService: ThemeSwitcherService,
    private readonly _languageSwitcherService: LanguageSwitcherService
  ) {}

  handleChangeLang(translation: TranslationRow): void {
    this._languageSwitcherService.changeLang(translation);
  }

  handleChangeTheme(theme: ThemeModeType): void {
    this._themeSwitcherService.changeTheme(theme.id);
  }
}
