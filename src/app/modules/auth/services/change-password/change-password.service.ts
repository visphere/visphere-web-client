/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ChangePasswordFormModel } from '~/auth-mod/models/change-password-form.model';
import { AuthHttpClientService } from '~/auth-mod/services/auth-http-client/auth-http-client.service';
import { ChangePasswordFormStage } from '~/auth-mod/types/form-stage.type';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractSimpleFormStateProvider } from '~/shared-mod/services/abstract-simple-form-state-provider';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

@Injectable()
export class ChangePasswordService extends AbstractSimpleFormStateProvider<
  ChangePasswordFormStage,
  BaseMessageModel
> {
  private _token = '';

  constructor(
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _router: Router,
    private readonly _store: Store<SharedReducer>
  ) {
    super('change');
  }

  validateToken$(token: string): Observable<BaseMessageModel> {
    return this._authHttpClientService.resetPasswordValidateToken$(token).pipe(
      catchError(async err => {
        await this._router.navigateByUrl('/auth/reset-password');
        return err;
      })
    );
  }

  override abstractSubmitForm$(): Observable<BaseMessageModel> {
    const data = this.parseFormValues<ChangePasswordFormModel>();
    return this._authHttpClientService
      .changePasswordViaEmail$(data, this._token)
      .pipe(
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
          this._currentStage$.next('success');
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }

  setToken(token: string): void {
    this._token = token;
  }
}
