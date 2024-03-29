/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { MfaTokenForm } from '~/auth-mod/models/mfa-data.model';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { LoginResDtoModel } from '~/shared-mod/models/identity.model';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import { actionAddSnackbar } from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractMfaFormProvider } from '../abstract-mfa-form-provider';
import { MfaHttpClientService } from '../mfa-http-client/mfa-http-client.service';

@Injectable()
export class MfaEmailService
  extends AbstractMfaFormProvider
  implements OnDestroy
{
  private _isSending$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly _mfaHttpClientService: MfaHttpClientService,
    private readonly _store: Store<AuthReducer | SharedReducer>,
    localStorageService: LocalStorageService,
    router: Router
  ) {
    super(_store, router, localStorageService);
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  override abstractSubmitForm$(): Observable<LoginResDtoModel> {
    const { token } = this.parseFormValues<MfaTokenForm>();
    const { usernameOrEmailAddress, password } = this._mfaState;
    return this.verifyCodeAndPerformLogin$(
      this._mfaHttpClientService.alternativeEmailValidateToken$(token, {
        usernameOrEmailAddress,
        password,
      })
    );
  }

  sendEmailMessage$(): Observable<BaseMessageModel> {
    const { usernameOrEmailAddress, password } = this._mfaState;
    this._isSending$.next(true);
    return this._mfaHttpClientService
      .alternativeEmailSend$({
        usernameOrEmailAddress,
        password,
      })
      .pipe(
        tap(({ message }) => {
          this._store.dispatch(
            actionAddSnackbar({
              content: {
                placeholder: message,
                omitTransformation: true,
              },
              severity: 'success',
            })
          );
          this._isSending$.next(false);
        }),
        catchError(err => {
          this._isSending$.next(false);
          return throwError(() => err);
        })
      );
  }

  get isSending$(): Observable<boolean> {
    return this._isSending$.asObservable();
  }
}
