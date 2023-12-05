/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Observable,
  catchError,
  combineLatest,
  map,
  tap,
  throwError,
} from 'rxjs';
import { RelatedWithElements } from '~/settings-mod/model/related-value.model';
import { RadioElement } from '~/settings-mod/types/radio-element.type';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AVAILABLE_TRANSLATIONS } from '~/shared-mod/types/translation.type';
import { AbstractUserSettingsProvider } from '../abstract-user-settings.provider';
import { SettingsHttpClientService } from '../settings-http-client/settings-http-client.service';

@Injectable()
export class LanguageSettingsService extends AbstractUserSettingsProvider {
  constructor(
    private readonly _settingsHttpClientService: SettingsHttpClientService,
    private readonly _store: Store<SharedReducer>,
    private readonly _languageSwitcherService: LanguageSwitcherService
  ) {
    super(_store);
  }

  loadAvailableLanguages(): Observable<RelatedWithElements> {
    return combineLatest([
      this._languageSwitcherService.selectedLang$,
      this._loggedUser$,
    ]).pipe(
      map(([currentLang, loggedUser]) => {
        let selectedLang = loggedUser?.settings.lang;
        if (!loggedUser) {
          return {
            elements: [],
            definedValue: currentLang.lang,
            isSelected: false,
          };
        }
        if (!selectedLang) {
          selectedLang = currentLang.lang;
        }
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
          isSelected: !!loggedUser?.settings.lang,
        };
      })
    );
  }

  persistRelatedLanguage(
    selectedLang: string | null
  ): Observable<BaseMessageModel | null> {
    this.setLoading(true);
    return this._settingsHttpClientService
      .relateLangWithUser({ relatedValue: selectedLang })
      .pipe(
        tap(({ message }) => {
          this.setLoading(false);
          this._store.dispatch(
            NgrxAction_SHA.__updateLoggedUserLang({ lang: selectedLang })
          );
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
