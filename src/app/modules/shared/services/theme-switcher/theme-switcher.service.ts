/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: theme-switcher.service.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 01:47:36
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
import { DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import { StorageKeyType } from '~/shared-mod/types/storage-key.type';
import {
  IThemeModeType,
  THEME_MODES,
  ThemeType,
} from '~/shared-mod/types/theme-mode.type';

@Injectable({ providedIn: 'root' })
export class ThemeSwitcherService {
  private _deviceTheme = this.getThemeBasedId(ThemeType.DEVICE);
  private _isPickedDevice = true;
  private _selectedTheme$: BehaviorSubject<IThemeModeType> =
    new BehaviorSubject<IThemeModeType>(this._deviceTheme);

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
      this._localStorageService.get(StorageKeyType.SELECTED_THEME);
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
    this._localStorageService.save(StorageKeyType.SELECTED_THEME, {
      theme: selectedTheme,
    });
    this.updateTheme(selectedTheme);
  }

  private updateTheme(theme: ThemeType): void {
    this._isPickedDevice = theme === ThemeType.DEVICE;
    if (theme === ThemeType.DEVICE) {
      this.setTheme(this.isDarkBrowserTheme());
      return;
    }
    this.setTheme(theme === ThemeType.DARK);
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

  private getThemeBasedId(themeId: ThemeType): IThemeModeType {
    const theme = THEME_MODES.find(t => t.id === themeId);
    return theme || THEME_MODES[0];
  }

  get availableThemes(): IThemeModeType[] {
    return THEME_MODES;
  }
  get selectedTheme$(): Observable<IThemeModeType> {
    return this._selectedTheme$.asObservable();
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
