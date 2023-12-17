/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractLoadableProvider } from '~/shared-mod/services/abstract-loadable-provider';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { DevastateAccountHttpClientService } from '../devastate-account-http-client/devastate-account-http-client.service';
import { PasswordConfirmationService } from '../password-confirmation/password-confirmation.service';

@Injectable()
export class DevastateAccountService extends AbstractLoadableProvider {
  constructor(
    private readonly _devastateAccountHttpClientService: DevastateAccountHttpClientService,
    private readonly _store: Store<SharedReducer>,
    private readonly _localStorageService: LocalStorageService,
    private readonly _passwordConfirmationService: PasswordConfirmationService
  ) {
    super();
  }

  disableAcount$(passwordOrMfaCode: string): Observable<BaseMessageModel> {
    return this.proceedDevastateAction$(
      this._devastateAccountHttpClientService.disableAccount$(
        this._passwordConfirmationService.formatToConfirmationDto(
          passwordOrMfaCode
        )
      )
    );
  }

  deleteAccount$(passwordOrMfaCode: string): Observable<BaseMessageModel> {
    return this.proceedDevastateAction$(
      this._devastateAccountHttpClientService.deleteAccount$(
        this._passwordConfirmationService.formatToConfirmationDto(
          passwordOrMfaCode
        )
      )
    );
  }

  private proceedDevastateAction$(
    httpReq: Observable<BaseMessageModel>
  ): Observable<BaseMessageModel> {
    this._passwordConfirmationService.setLoading(true);
    return httpReq.pipe(
      tap(({ message }) => {
        this._passwordConfirmationService.setLoading(false);
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
        this._passwordConfirmationService.setLoading(false);
        return throwError(() => err);
      })
    );
  }
}
