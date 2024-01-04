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
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { actionUpdateLoggedUserSettings } from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AVAILABLE_TRANSLATIONS } from '~/shared-mod/types/translation.type';
import { SettingsHttpClientService } from '../settings-http-client/settings-http-client.service';

@Injectable()
export class LanguageSettingsService extends AbstractWsWebhookProvider<SharedReducer> {
  constructor(
    private readonly _settingsHttpClientService: SettingsHttpClientService,
    private readonly _store: Store<SharedReducer>,
    private readonly _languageSwitcherService: LanguageSwitcherService
  ) {
    super(_store);
  }

  loadAvailableLanguages$(): Observable<RelatedWithElements> {
    return this._onChangeObserver$.pipe(
      switchMap(() =>
        this._settingsHttpClientService
          .getUserSettings$()
          .pipe(
            switchMap(userSettings =>
              this._languageSwitcherService.selectedLang$.pipe(
                map(currentLang => ({ userSettings, currentLang }))
              )
            )
          )
      ),
      map(({ userSettings, currentLang }) => {
        let selectedLang = userSettings.lang;
        if (!selectedLang) {
          selectedLang = currentLang.lang;
        }
        this._store.dispatch(actionUpdateLoggedUserSettings({ userSettings }));
        this._isFetching$.next(false);
        return {
          elements: AVAILABLE_TRANSLATIONS.map(({ lang, name }) => ({
            id: lang,
            leftLabel: name,
            isSelected: selectedLang === lang,
            rightContent: {
              type: 'image',
              referenceValue: `lang/${lang}.png`,
            },
          })),
          definedValue: currentLang.lang,
          isSelected: !!userSettings.lang,
        };
      })
    );
  }

  persistRelatedLanguage$(
    selectedLang: string | null
  ): Observable<BaseMessageModel | null> {
    this.setLoading(true);
    return this._settingsHttpClientService
      .relateLangWithUser$({ relatedValue: selectedLang })
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

  saveSelectedLang(element: RadioElement): void {
    this._languageSwitcherService.changeLangByName(element.id as string);
  }
}
