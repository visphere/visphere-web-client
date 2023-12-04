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
import { LoggedUser } from '~/shared-mod/models/logged-user.model';
import { AbstractLoadableProvider } from '~/shared-mod/services/abstract-loadable-provider';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import * as NgrxSelector_SHA from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AVAILABLE_TRANSLATIONS } from '~/shared-mod/types/translation.type';
import { SettingsHttpClientService } from '../settings-http-client/settings-http-client.service';

@Injectable()
export class LanguageSettingsService extends AbstractLoadableProvider {
  private _loggedUser$: Observable<LoggedUser | null> = this._store.select(
    NgrxSelector_SHA.selectLoggedUser
  );

  constructor(
    private readonly _settingsHttpClientService: SettingsHttpClientService,
    private readonly _store: Store<SharedReducer>,
    private readonly _languageSwitcherService: LanguageSwitcherService
  ) {
    super();
  }

  loadAvailableLanguages(): Observable<RelatedWithElements> {
    return combineLatest([
      this._languageSwitcherService.selectedLang$,
      this._loggedUser$,
    ]).pipe(
      map(([currentLang, loggedUser]) => {
        let selectedLang = loggedUser?.lang;
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
          isSelected: !!loggedUser?.lang,
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
          this._store.dispatch(
            NgrxAction_SHA.__addSnackbar({
              content: {
                placeholder: message,
                omitTransformation: true,
              },
              severity: 'success',
            })
          );
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
