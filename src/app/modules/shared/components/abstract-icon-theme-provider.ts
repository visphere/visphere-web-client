/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { environment } from '~/env/environment';
import { ThemeSwitcherService } from '../services/theme-switcher/theme-switcher.service';
import { AbstractReactiveProvider } from '../utils/abstract-reactive-provider';

export abstract class AbstractIconThemeProvider extends AbstractReactiveProvider {
  protected path = environment.contentDistributorBaseUrl;
  protected themedBrandIconUrl = '';

  constructor(private readonly _absThemeSwitcherService: ThemeSwitcherService) {
    super();
  }

  protected loadBrandThemedIcon() {
    this.wrapAsObservable$(
      this._absThemeSwitcherService.selectedTheme$
    ).subscribe(theme => {
      const partialUrl = this._absThemeSwitcherService.isDarkMode(theme)
        ? 'vsph-small-light.svg'
        : 'vsph-small-dark.svg';
      this.themedBrandIconUrl = `${this.path}/static/logo/${partialUrl}`;
    });
  }
}
