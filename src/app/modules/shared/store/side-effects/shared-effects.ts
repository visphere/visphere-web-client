/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { delay, mergeMap, of, tap } from 'rxjs';
import { StorageKeys } from '~/shared-mod/models/identity.model';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';
import * as NgrxAction from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { ThemeType } from '~/shared-mod/types/theme-mode.type';

@Injectable()
export class SharedEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store<SharedReducer>,
    private readonly _languageSwitcherService: LanguageSwitcherService,
    private readonly _themeSwitcherService: ThemeSwitcherService,
    private readonly _localStorageService: LocalStorageService
  ) {}

  debounceSnackbarAfterOpen$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(NgrxAction.__addSnackbar),
        delay(5000),
        tap(() => {
          this._store.dispatch(NgrxAction.__removeSnackbar({}));
        })
      ),
    { dispatch: false }
  );

  persistUserSettingsAfterLogin$ = createEffect(() =>
    this._actions$.pipe(
      ofType(NgrxAction.__setLoggedUserDetails),
      mergeMap(({ details }) => {
        const {
          id,
          fullName,
          username,
          profileUrl,
          profileColor,
          joinDate,
          accessToken,
          refreshToken,
          credentialsSupplier,
          imageFromExternalProvider,
          isMfaSetup,
          settings,
          settings: { lang, theme },
        } = details;
        this._localStorageService.save<StorageKeys>('loggedUser', {
          accessToken,
          refreshToken,
        });
        if (lang) {
          this._languageSwitcherService.changeLangByName(lang);
        }
        if (theme) {
          this._themeSwitcherService.changeTheme(theme as ThemeType);
        }
        return of(
          NgrxAction.__persistLoggedUserDetails({
            details: {
              id,
              fullName,
              username,
              profileUrl,
              profileColor,
              joinDate,
              credentialsSupplier,
              imageFromExternalProvider,
              isMfaSetup,
              settings,
            },
          })
        );
      })
    )
  );
}
