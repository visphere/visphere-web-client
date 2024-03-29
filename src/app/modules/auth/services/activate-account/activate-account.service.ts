/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { ActivateAccountFormModel } from '~/auth-mod/models/activate-account-form.model';
import { AuthHttpClientService } from '~/auth-mod/services/auth-http-client/auth-http-client.service';
import { actionRemoveActivateAccountEmail } from '~/auth-mod/store/actions';
import { selectActivateAccountEmail } from '~/auth-mod/store/selectors';
import { ActivateAccountFormStage } from '~/auth-mod/types/form-stage.type';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractSimpleFormStateProvider } from '~/shared-mod/services/abstract-simple-form-state-provider';
import { actionAddSnackbar } from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

@Injectable()
export class ActivateAccountService
  extends AbstractSimpleFormStateProvider<
    ActivateAccountFormStage,
    BaseMessageModel
  >
  implements OnDestroy
{
  private _resendIsLoading$ = new BehaviorSubject<boolean>(false);

  userEmail = '';

  constructor(
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _router: Router,
    private readonly _store: Store<AuthReducer | SharedReducer>
  ) {
    super('activate');
    this.wrapAsObservable$(
      this._store.select(selectActivateAccountEmail)
    ).subscribe(userEmail => (this.userEmail = userEmail));
  }

  ngOnDestroy(): void {
    this._store.dispatch(actionRemoveActivateAccountEmail());
    this.unmountAllSubscriptions();
  }

  validateToken$(token: string): Observable<BaseMessageModel> {
    return this.performActivateAccountService$(token);
  }

  override abstractSubmitForm$(): Observable<BaseMessageModel> {
    const { token } = this.parseFormValues<ActivateAccountFormModel>();
    return this.performActivateAccountService$(token);
  }

  async returnToLoginAndClearState(): Promise<void> {
    this._store.dispatch(actionRemoveActivateAccountEmail());
    await this._router.navigate(['/auth/login']);
  }

  resendEmailMessage$(): Observable<BaseMessageModel> {
    this._resendIsLoading$.next(true);
    return this._authHttpClientService
      .resendActivateAccountToken$({ emailAddress: this.userEmail })
      .pipe(
        tap(({ message }) => {
          this._resendIsLoading$.next(false);
          this.pushSnackbar(message);
        }),
        catchError(err => {
          this._resendIsLoading$.next(false);
          return throwError(() => err);
        })
      );
  }

  private performActivateAccountService$(
    token: string
  ): Observable<BaseMessageModel> {
    return this._authHttpClientService.activateAccount$(token).pipe(
      tap(async ({ message }) => {
        this.setLoading(false);
        this.pushSnackbar(message);
        this._currentStage$.next('success');
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }

  private pushSnackbar(message: string): void {
    this._store.dispatch(
      actionAddSnackbar({
        content: {
          placeholder: message,
          omitTransformation: true,
        },
        severity: 'success',
      })
    );
  }

  get resendIsLoading$(): Observable<boolean> {
    return this._resendIsLoading$.asObservable();
  }
}
