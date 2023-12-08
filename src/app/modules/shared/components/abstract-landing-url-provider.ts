/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { environment } from '~/env/environment';
import { LanguageSwitcherService } from '../services/language-switcher/language-switcher.service';
import { ThemeSwitcherService } from '../services/theme-switcher/theme-switcher.service';
import { AbstractIconThemeProvider } from './abstract-icon-theme-provider';

export abstract class AbstractLandingUrlProvider extends AbstractIconThemeProvider {
  protected landingPagePath = '';

  constructor(
    _absThemeSwitcherService: ThemeSwitcherService,
    private readonly _absLanguageSwitcherService: LanguageSwitcherService
  ) {
    super(_absThemeSwitcherService);
  }

  protected loadLandingUrl() {
    this.wrapAsObservable$(
      this._absLanguageSwitcherService.selectedLang$
    ).subscribe(({ landingPrefix }) => {
      this.landingPagePath = `${environment.baseLandingUrl}${landingPrefix}`;
    });
  }
}
