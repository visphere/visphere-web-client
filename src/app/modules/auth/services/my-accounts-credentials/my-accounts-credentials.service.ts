/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, delay, of, tap, throwError } from 'rxjs';
import {
  MySavedAccountAuthFormModel,
  MySavedAccountModel,
} from '~/auth-mod/models/my-saved-account.model';
import * as NgrxAction_ATH from '~/auth-mod/store/actions';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { LoggedUser } from '~/shared-mod/models/logged-user.model';
import { AbstractSimpleFormProvider } from '~/shared-mod/services/abstract-simple-form-provider';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AuthHttpClientService } from '../auth-http-client/auth-http-client.service';
import { LoginService } from '../login/login.service';

@Injectable()
export class MyAccountsCredentialsService extends AbstractSimpleFormProvider<
  LoggedUser | undefined
> {
  private _loggedUser?: MySavedAccountModel;

  constructor(
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _localStorageService: LocalStorageService,
    private readonly _store: Store<AuthReducer | SharedReducer>,
    private readonly _router: Router
  ) {
    super();
  }

  setLoggedUser(userAccount: MySavedAccountModel): void {
    this._loggedUser = userAccount;
  }

  override abstractSubmitForm(): Observable<LoggedUser | undefined> {
    const { password } = this.parseFormValues<MySavedAccountAuthFormModel>();
    if (!this._loggedUser) {
      return of(undefined);
    }
    return this._authHttpClientService
      .loginViaAppAccount({
        usernameOrEmailAddress: this._loggedUser?.usernameOrEmailAddress || '',
        password,
      })
      .pipe(
        delay(500),
        tap(async res => {
          this.setLoading(false);
          const { emailAddress, accessToken, refreshToken, isActivated } = res;
          let navigateUrl = '/';
          if (!isActivated) {
            this._store.dispatch(
              NgrxAction_ATH.__setActivateAccountEmail({ email: emailAddress })
            );
            navigateUrl = '/auth/activate-account';
          } else {
            this._localStorageService.save('loggedUser', {
              accessToken,
              refreshToken,
            });
            this._store.dispatch(
              NgrxAction_SHA.__setLoggedUserDetails({
                details: LoginService.mapToUserDetails(res),
              })
            );
          }
          this._store.dispatch(
            NgrxAction_ATH.__setMySavedAccountVerified({
              uuid: this._loggedUser!.accountId,
              thumbnailUrl: res.profileUrl,
              username: res.username,
            })
          );
          await this._router.navigateByUrl(navigateUrl);
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }
}
