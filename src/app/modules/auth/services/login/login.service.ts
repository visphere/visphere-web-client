/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  tap,
  throwError,
} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import {
  LoginFormModel,
  LoginResDtoModel,
} from '~/auth-mod/models/login-form.model';
import { MySavedAccountModel } from '~/auth-mod/models/my-saved-account.model';
import { AuthHttpClientService } from '~/auth-mod/services/auth-http-client/auth-http-client.service';
import * as NgrxAction_ATH from '~/auth-mod/store/actions';
import { LoginFormStage } from '~/auth-mod/types/form-stage.type';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { LoggedUser } from '~/shared-mod/models/logged-user.model';
import { AbstractMultistageFormProvider } from '~/shared-mod/services/abstract-multistage-form-provider';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

@Injectable()
export class LoginService
  extends AbstractMultistageFormProvider<LoginFormStage, LoggedUser>
  implements OnDestroy
{
  private _isNextButtonEnabled$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _localStorageService: LocalStorageService,
    private readonly _store: Store<SharedReducer | AuthReducer>,
    private readonly _router: Router
  ) {
    super('login');
  }

  onValueChange(): void {
    this.listenChanges<LoginFormModel>((formValues: LoginFormModel) => {
      this._isNextButtonEnabled$.next(
        formValues.usernameOrEmailAddress.length !== 0
      );
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  moveForward(): void {
    this._currentStage$.next('password');
  }

  moveBackward(): void {
    this._currentStage$.next('login');
    this._rootForm.get('password')?.reset();
  }

  override abstractSubmitForm(): Observable<LoggedUser> {
    const { usernameOrEmailAddress, password, rememberAccount } =
      this.parseFormValues<LoginFormModel>();
    return this._authHttpClientService
      .loginViaAppAccount({
        usernameOrEmailAddress,
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
          if (rememberAccount) {
            this.rememberAccount(res);
          }
          await this._router.navigateByUrl(navigateUrl);
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }

  private rememberAccount(res: LoginResDtoModel): void {
    const { username, profileUrl } = res;
    const accountAlreadyExist = this._localStorageService
      .get<MySavedAccountModel[]>('mySavedAccounts')
      ?.some(account => account.usernameOrEmailAddress === username);
    if (!accountAlreadyExist) {
      this._localStorageService.push<MySavedAccountModel>('mySavedAccounts', {
        accountId: uuidv4(),
        usernameOrEmailAddress: username,
        thumbnailUrl: profileUrl,
        isVerified: true,
      });
    }
  }

  static mapToUserDetails({
    fullName,
    profileUrl,
    accessToken,
    refreshToken,
  }: LoginResDtoModel): LoggedUser {
    return {
      fullName,
      profileUrl,
      accessToken,
      refreshToken,
    };
  }

  get isNextButtonEnabled$(): Observable<boolean> {
    return this._isNextButtonEnabled$.asObservable();
  }
}
