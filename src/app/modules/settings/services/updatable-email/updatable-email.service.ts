/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { UpdatableEmailFormStages } from '~/settings-mod/types/form-stages.type';
import { EmailVariant } from '~/settings-mod/types/updatable-modal.type';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractMultistageFormProvider } from '~/shared-mod/services/abstract-multistage-form-provider';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { UpdatableEmailHttpClientService } from '../updatable-email-http-client/updatable-email-http-client.service';

@Injectable()
export class UpdatableEmailService
  extends AbstractMultistageFormProvider<
    UpdatableEmailFormStages,
    BaseMessageModel
  >
  implements OnDestroy
{
  private _i18nPrefix$ = new BehaviorSubject<string>('');
  private _isResendLoading$ = new BehaviorSubject<boolean>(false);

  private _formData?: { [key: string]: string };
  private _emailVariant: EmailVariant = 'first';

  constructor(
    private readonly _updatableEmailHttpClientService: UpdatableEmailHttpClientService,
    private readonly _store: Store<SharedReducer>
  ) {
    super('start');
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  override abstractSubmitForm$(): Observable<BaseMessageModel> {
    this._formData = this.parseFormValues<{ [key: string]: string }>();
    return this._updatableEmailHttpClientService
      .sendRequestForChangeEmailAddress$(
        this._formData,
        this._emailVariant,
        false
      )
      .pipe(
        tap(({ message }) => {
          this.setLoading(false);
          this.showSuccessSnackbar(message);
          this.setFormStage('validate');
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }

  validateAndChangeEmail$(token: string): Observable<BaseMessageModel> {
    this.setLoading(true);
    return this._updatableEmailHttpClientService
      .validateTokenAndChangeEmailAddress$(
        this._formData,
        token,
        this._emailVariant
      )
      .pipe(
        tap(({ message }) => {
          this.setLoading(false);
          this.showSuccessSnackbar(message);
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }

  resendTokenForValidateEmail$(): Observable<BaseMessageModel> {
    this._isResendLoading$.next(true);
    return this._updatableEmailHttpClientService
      .sendRequestForChangeEmailAddress$(
        this._formData,
        this._emailVariant,
        true
      )
      .pipe(
        tap(({ message }) => {
          this._isResendLoading$.next(false);
          this.showSuccessSnackbar(message);
        }),
        catchError(err => {
          this._isResendLoading$.next(false);
          return throwError(() => err);
        })
      );
  }

  private showSuccessSnackbar(message: string): void {
    this._store.dispatch(
      NgrxAction_SHA.__addSnackbar({
        content: {
          placeholder: message,
          omitTransformation: true,
        },
        severity: 'success',
      })
    );
  }

  setEmailVariant(variant: EmailVariant): void {
    this._emailVariant = variant;
  }

  setI18nPrefix(i18nPrefix: string): void {
    this._i18nPrefix$.next(i18nPrefix);
  }

  get i18nPrefix$(): Observable<string> {
    return this._i18nPrefix$.asObservable();
  }
  get isResendLoading$(): Observable<boolean> {
    return this._isResendLoading$.asObservable();
  }
}
