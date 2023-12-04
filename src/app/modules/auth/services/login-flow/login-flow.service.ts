/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, tap, throwError } from 'rxjs';
import * as NgrxAction_ATH from '~/auth-mod/store/actions';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { LoginResDtoModel } from '~/shared-mod/models/identity.model';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { ThemeType } from '~/shared-mod/types/theme-mode.type';
import { AuthHttpClientService } from '../auth-http-client/auth-http-client.service';

@Injectable({ providedIn: 'root' })
export class LoginFlowService {
  constructor(
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _localStorageService: LocalStorageService,
    private readonly _store: Store<SharedReducer | AuthReducer>,
    private readonly _router: Router,
    private readonly _themeSwitcherService: ThemeSwitcherService,
    private readonly _languageSwitcherService: LanguageSwitcherService
  ) {}

  performLoginFlow(
    usernameOrEmailAddress: string,
    password: string,
    onSubmitCallback: () => void,
    onSaveCallback: (res: LoginResDtoModel) => void
  ): Observable<LoginResDtoModel> {
    return this._authHttpClientService
      .loginViaAppAccount({
        usernameOrEmailAddress,
        password,
      })
      .pipe(
        tap(async res => {
          onSubmitCallback();
          const {
            emailAddress,
            accessToken,
            refreshToken,
            isActivated,
            isMfaEnabled,
            isMfaSetup,
            lang,
            theme,
          } = res;
          let navigateUrl = '/';
          if (!isActivated) {
            this._store.dispatch(
              NgrxAction_ATH.__setActivateAccountEmail({ email: emailAddress })
            );
            navigateUrl = '/auth/activate-account';
          } else {
            if (isMfaEnabled) {
              this._store.dispatch(
                NgrxAction_ATH.__setMfaState({
                  mfaState: { usernameOrEmailAddress, password, isMfaSetup },
                })
              );
              navigateUrl = '/auth/mfa';
            } else {
              this._localStorageService.save('loggedUser', {
                accessToken,
                refreshToken,
              });
              if (lang) {
                this._languageSwitcherService.changeLangByName(lang);
              }
              if (theme) {
                this._themeSwitcherService.changeTheme(theme as ThemeType);
              }
              this._store.dispatch(
                NgrxAction_SHA.__setLoggedUserDetails({
                  details: {
                    fullName: res.fullName,
                    profileUrl: res.profileUrl,
                    lang,
                    theme,
                  },
                })
              );
            }
          }
          onSaveCallback(res);
          await this._router.navigateByUrl(navigateUrl);
        }),
        catchError(err => {
          onSubmitCallback();
          return throwError(() => err);
        })
      );
  }
}
