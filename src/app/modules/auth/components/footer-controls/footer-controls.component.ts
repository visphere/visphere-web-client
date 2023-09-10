/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '~/env/environment';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';
import { ThemeModeType } from '~/shared-mod/types/theme-mode.type';
import { TranslationRow } from '~/shared-mod/types/translation.type';

@Component({
  selector: 'msph-footer-controls',
  templateUrl: './footer-controls.component.html',
  host: { class: 'flex w-full gap-3 text-sm font-normal' },
})
export class FooterControlsComponent {
  path = environment.contentDistributorBaseUrl;

  traslations: TranslationRow[] = this._languageSwitcherService.availableLangs;
  selectedLang$: Observable<TranslationRow> =
    this._languageSwitcherService.selectedLang$;

  themes: ThemeModeType[] = this._themeSwitcherService.availableThemes;
  selectedTheme$: Observable<ThemeModeType> =
    this._themeSwitcherService.selectedTheme$;

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
