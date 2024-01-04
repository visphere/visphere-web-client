/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, tap, throwError } from 'rxjs';
import {
  actionSetActivateAccountEmail,
  actionSetMfaState,
} from '~/auth-mod/store/actions';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { LoginResDtoModel } from '~/shared-mod/models/identity.model';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import {
  actionOpenDisabledAccountModal,
  actionSetLoggedUserDetails,
} from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AuthHttpClientService } from '../auth-http-client/auth-http-client.service';

@Injectable({ providedIn: 'root' })
export class LoginFlowService {
  constructor(
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _store: Store<SharedReducer | AuthReducer>,
    private readonly _router: Router,
    private readonly _localStorageService: LocalStorageService
  ) {}

  performLoginFlow$(
    usernameOrEmailAddress: string,
    password: string,
    onSubmitCallback: () => void,
    onSaveCallback: (res: LoginResDtoModel) => void
  ): Observable<LoginResDtoModel> {
    return this._authHttpClientService
      .loginViaAppAccount$({
        usernameOrEmailAddress,
        password,
      })
      .pipe(
        tap(async res => {
          onSubmitCallback();
          const {
            emailAddress,
            isActivated,
            isMfaEnabled,
            isMfaSetup,
            isDisabled,
            accessToken,
          } = res;
          let navigateUrl = '/';
          if (!isActivated) {
            this._store.dispatch(
              actionSetActivateAccountEmail({ email: emailAddress })
            );
            navigateUrl = '/auth/activate-account';
          } else {
            if (isMfaEnabled) {
              this._store.dispatch(
                actionSetMfaState({
                  mfaState: { usernameOrEmailAddress, password, isMfaSetup },
                })
              );
              navigateUrl = '/auth/mfa';
            } else {
              this._store.dispatch(
                isDisabled
                  ? actionOpenDisabledAccountModal({ accessToken })
                  : actionSetLoggedUserDetails({
                      details: res,
                    })
              );
              const memorizedPath = this._localStorageService.get<string>(
                `memorizedPath+${res.username}`
              );
              if (memorizedPath) {
                navigateUrl = memorizedPath;
              }
            }
          }
          if (!isDisabled || isMfaEnabled) {
            onSaveCallback(res);
            await this._router.navigateByUrl(navigateUrl);
          }
        }),
        catchError(err => {
          onSubmitCallback();
          return throwError(() => err);
        })
      );
  }
}
