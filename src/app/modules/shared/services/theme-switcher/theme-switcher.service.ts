/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: theme-switcher.service.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 20:54:17
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
import { DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import {
  ThemeModeType,
  ThemeType,
  themeModes,
} from '~/shared-mod/types/theme-mode.type';

@Injectable({ providedIn: 'root' })
export class ThemeSwitcherService {
  private _deviceTheme = this.getThemeBasedId('device');
  private _isPickedDevice = true;
  private _selectedTheme$: BehaviorSubject<ThemeModeType> =
    new BehaviorSubject<ThemeModeType>(this._deviceTheme);

  constructor(
    @Inject(DOCUMENT) private readonly _document: Document,
    private readonly _localStorageService: LocalStorageService
  ) {}

  loadTheme(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addEventListener('change', e => {
      if (!this._isPickedDevice) return;
      this.setTheme(e.matches);
    });
    const savedTheme: { theme: ThemeType } | null =
      this._localStorageService.get('selectedTheme');
    if (savedTheme) {
      this.updateTheme(savedTheme.theme);
      this._selectedTheme$.next(this.getThemeBasedId(savedTheme.theme));
      return;
    }
    this.setTheme(this.isDarkBrowserTheme());
    this._selectedTheme$.next(this._deviceTheme);
  }

  changeTheme(selectedTheme: ThemeType): void {
    const theme = this.getThemeBasedId(selectedTheme);
    if (!theme) return;
    this._selectedTheme$.next(theme);
    this._localStorageService.save('selectedTheme', {
      theme: selectedTheme,
    });
    this.updateTheme(selectedTheme);
  }

  isDarkMode(theme: ThemeModeType): boolean {
    return theme.id === 'device'
      ? this.isDarkBrowserTheme()
      : theme.id === 'dark';
  }

  private updateTheme(theme: ThemeType): void {
    this._isPickedDevice = theme === 'device';
    if (theme === 'device') {
      this.setTheme(this.isDarkBrowserTheme());
      return;
    }
    this.setTheme(theme === 'dark');
  }

  private setTheme(isDark: boolean): void {
    this._document.documentElement.className = isDark ? 'dark' : '';
  }

  private isDarkBrowserTheme(): boolean {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }

  private getThemeBasedId(themeId: ThemeType): ThemeModeType {
    const theme = themeModes.find(t => t.id === themeId);
    return theme || themeModes[0];
  }

  get availableThemes(): ThemeModeType[] {
    return themeModes;
  }
  get selectedTheme$(): Observable<ThemeModeType> {
    return this._selectedTheme$.asObservable();
  }
}

function themeSwitcherInitFactory(
  themeSwitcher: ThemeSwitcherService
): () => void {
  return () => themeSwitcher.loadTheme();
}

export const themeSwitcherInitializer = {
  provide: APP_INITIALIZER,
  useFactory: themeSwitcherInitFactory,
  deps: [ThemeSwitcherService],
  multi: true,
};
