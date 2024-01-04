/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { StartResetPasswordViaEmailFormModel } from '~/auth-mod/models/reset-password-form.model';
import { AuthHttpClientService } from '~/auth-mod/services/auth-http-client/auth-http-client.service';
import { ResetPasswordService } from '~/auth-mod/services/reset-password/reset-password.service';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractSimpleFormProvider } from '~/shared-mod/services/abstract-simple-form-provider';
import { actionAddSnackbar } from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

@Injectable()
export class StartResetPasswordService extends AbstractSimpleFormProvider<BaseMessageModel> {
  constructor(
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _resetPasswordService: ResetPasswordService,
    private readonly _store: Store<SharedReducer>
  ) {
    super();
  }

  override abstractSubmitForm$(): Observable<BaseMessageModel> {
    const { usernameOrEmailAddress } =
      this.parseFormValues<StartResetPasswordViaEmailFormModel>();
    return this._authHttpClientService
      .startResetPasswordViaEmail$({ usernameOrEmailAddress })
      .pipe(
        tap(({ message }) => {
          this.setLoading(false);
          this._store.dispatch(
            actionAddSnackbar({
              content: {
                placeholder: message,
                omitTransformation: true,
              },
              severity: 'success',
            })
          );
          this._resetPasswordService.setCurrentStage('token');
          this._resetPasswordService.setUsernameOrEmailAddress(
            usernameOrEmailAddress
          );
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }
}
