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
import { FinishResetPasswordViaEmailFormModel } from '~/auth-mod/models/reset-password-form.model';
import { AuthHttpClientService } from '~/auth-mod/services/auth-http-client/auth-http-client.service';
import { ResetPasswordService } from '~/auth-mod/services/reset-password/reset-password.service';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractSimpleFormProvider } from '~/shared-mod/services/abstract-simple-form-provider';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

@Injectable()
export class FinishResetPasswordService
  extends AbstractSimpleFormProvider<BaseMessageModel>
  implements OnDestroy
{
  private _resendIsLoading$ = new BehaviorSubject<boolean>(false);

  userLoginOrEmail = '';

  constructor(
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _resetPasswordService: ResetPasswordService,
    private readonly _router: Router,
    private readonly _store: Store<SharedReducer>
  ) {
    super();
    this.wrapAsObservable(
      this._resetPasswordService.userLoginOrEmail$
    ).subscribe(userLoginOrEmail => (this.userLoginOrEmail = userLoginOrEmail));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  override abstractSubmitForm(): Observable<BaseMessageModel> {
    const { token } =
      this.parseFormValues<FinishResetPasswordViaEmailFormModel>();
    return this._authHttpClientService.resetPasswordValidateToken(token).pipe(
      delay(500),
      tap(async () => {
        this.setLoading(false);
        await this._router.navigateByUrl(`/auth/change-password/${token}`);
        window.scrollTo(0, 0);
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }

  resendEmailMessage(): Observable<BaseMessageModel> {
    this._resendIsLoading$.next(true);
    return this._authHttpClientService
      .resendResetPasswordToken({
        usernameOrEmailAddress: this.userLoginOrEmail,
      })
      .pipe(
        delay(500),
        tap(({ message }) => {
          this._resendIsLoading$.next(false);
          this._store.dispatch(
            NgrxAction_SHA.__addSnackbar({
              content: {
                placeholder: message,
                omitTransformation: true,
              },
              severity: 'success',
            })
          );
        }),
        catchError(err => {
          this._resendIsLoading$.next(false);
          return throwError(() => err);
        })
      );
  }

  get resendIsLoading$(): Observable<boolean> {
    return this._resendIsLoading$.asObservable();
  }
}
