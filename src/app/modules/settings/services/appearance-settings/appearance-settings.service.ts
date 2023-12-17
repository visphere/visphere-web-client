/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';
import { RelatedWithElements } from '~/settings-mod/model/related-value.model';
import { RadioElement } from '~/settings-mod/types/radio-element.type';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractWsWebhookProvider } from '~/shared-mod/services/abstract-ws-webhook.provider';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { ThemeType, themeModes } from '~/shared-mod/types/theme-mode.type';
import { SettingsHttpClientService } from '../settings-http-client/settings-http-client.service';

@Injectable()
export class AppearanceSettingsService extends AbstractWsWebhookProvider<SharedReducer> {
  constructor(
    private readonly _settingsHttpClientService: SettingsHttpClientService,
    private readonly _store: Store<SharedReducer>,
    private readonly _themeSwitcherService: ThemeSwitcherService
  ) {
    super(_store);
  }

  loadAvailableThemes$(): Observable<RelatedWithElements> {
    return this._onChangeObserver$.pipe(
      switchMap(() =>
        this._settingsHttpClientService
          .getUserSettings$()
          .pipe(
            switchMap(userSettings =>
              this._themeSwitcherService.selectedTheme$.pipe(
                map(currentTheme => ({ userSettings, currentTheme }))
              )
            )
          )
      ),
      map(({ userSettings, currentTheme }) => {
        let selectedTheme = userSettings.theme;
        if (!selectedTheme) {
          selectedTheme = currentTheme.id;
        }
        this._store.dispatch(
          NgrxAction_SHA.__updateLoggedUserSettings({ userSettings })
        );
        this._isFetching$.next(false);
        return {
          elements: themeModes.map(({ id, i18nKey, icon }) => ({
            id,
            leftLabel: i18nKey,
            isSelected: selectedTheme === id,
            rightContent: {
              type: 'icon',
              referenceValue: icon,
            },
          })),
          definedValue: currentTheme.id,
          isSelected: !!userSettings.theme,
        };
      })
    );
  }

  persistRelatedTheme$(
    selectedTheme: string | null
  ): Observable<BaseMessageModel | null> {
    this.setLoading(true);
    return this._settingsHttpClientService
      .relateThemeWithUser$({ relatedValue: selectedTheme })
      .pipe(
        tap(({ message }) => {
          this.setLoading(false);
          this.showSuccessSnackbar(message);
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }

  saveSelectedTheme(element: RadioElement): void {
    this._themeSwitcherService.changeTheme(element.id as ThemeType);
  }
}
