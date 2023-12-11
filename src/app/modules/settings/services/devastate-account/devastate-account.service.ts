/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { PasswordConfirmationReqDto } from '~/settings-mod/model/password-confirmation.model';
import { DevastateModalFormStage } from '~/settings-mod/types/form-stages.type';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractLoadableProvider } from '~/shared-mod/services/abstract-loadable-provider';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { DevastateAccountHttpClientService } from '../devastate-account-http-client/devastate-account-http-client.service';

@Injectable()
export class DevastateAccountService extends AbstractLoadableProvider {
  private _savedPassword = '';
  private _currentStage$ = new BehaviorSubject<DevastateModalFormStage>(
    'password'
  );

  constructor(
    private readonly _devastateAccountHttpClientService: DevastateAccountHttpClientService,
    private readonly _store: Store<SharedReducer>,
    private readonly _localStorageService: LocalStorageService
  ) {
    super();
  }

  persistPasswordAndUpdateStage(password: string): void {
    this._savedPassword = password;
    this._currentStage$.next('mfa');
  }

  returnToPassword(): void {
    this._currentStage$.next('password');
  }

  onCloseModal(): void {
    this.returnToPassword();
    this._savedPassword = '';
  }

  disableAcount$(passwordOrMfaCode: string): Observable<BaseMessageModel> {
    return this.proceedDevastateAction$(
      this._devastateAccountHttpClientService.disableAccount$(
        this.formatToConfirmationDto(passwordOrMfaCode)
      )
    );
  }

  deleteAccount$(passwordOrMfaCode: string): Observable<BaseMessageModel> {
    return this.proceedDevastateAction$(
      this._devastateAccountHttpClientService.deleteAccount$(
        this.formatToConfirmationDto(passwordOrMfaCode)
      )
    );
  }

  private formatToConfirmationDto(
    passwordOrMfaCode: string
  ): PasswordConfirmationReqDto {
    let password = passwordOrMfaCode;
    let mfaCode = '';
    if (this._savedPassword) {
      password = this._savedPassword;
      mfaCode = passwordOrMfaCode;
    }
    return {
      password,
      mfaCode,
    };
  }

  private proceedDevastateAction$(
    httpReq: Observable<BaseMessageModel>
  ): Observable<BaseMessageModel> {
    this.setLoading(true);
    return httpReq.pipe(
      tap(({ message }) => {
        this.setLoading(false);
        this._store.dispatch(
          NgrxAction_SHA.__addSnackbar({
            content: {
              placeholder: message,
              omitTransformation: true,
            },
            severity: 'success',
          })
        );
        this._store.dispatch(NgrxAction_SHA.__removeUserDetails());
        this._localStorageService.remove('loggedUser');
      }),
      catchError(err => {
        this.setLoading(false);
        this._currentStage$.next('password');
        return throwError(() => err);
      })
    );
  }

  get currentStage$(): Observable<DevastateModalFormStage> {
    return this._currentStage$.asObservable();
  }
}
