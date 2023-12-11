/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, tap, throwError } from 'rxjs';
import * as NgrxAction_ATH from '~/auth-mod/store/actions';
import * as NgrxSelector_ATH from '~/auth-mod/store/selectors';
import { LoginResDtoModel } from '~/shared-mod/models/identity.model';
import { AbstractSimpleFormProvider } from '~/shared-mod/services/abstract-simple-form-provider';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { MfaStateModel } from '../models/mfa-data.model';
import { AuthReducer } from '../types/ngrx-store.type';

export abstract class AbstractMfaFormProvider extends AbstractSimpleFormProvider<LoginResDtoModel> {
  protected _mfaState!: MfaStateModel;

  constructor(
    private readonly _absStore: Store<AuthReducer | SharedReducer>,
    private readonly _absRouter: Router
  ) {
    super();
    this.wrapAsObservable$(
      this._absStore.select(NgrxSelector_ATH.selectMfaState)
    ).subscribe(state => {
      if (state) {
        this._mfaState = state;
      }
    });
  }

  protected verifyCodeAndPerformLogin$(
    pipingObject$: Observable<LoginResDtoModel>
  ): Observable<LoginResDtoModel> {
    return pipingObject$.pipe(
      tap(async res => {
        this.setLoading(false);
        const { isDisabled, accessToken } = res;
        this._absStore.dispatch(
          isDisabled
            ? NgrxAction_SHA.__openDisabledAccountModal({ accessToken })
            : NgrxAction_SHA.__setLoggedUserDetails({
                details: res,
              })
        );
        this._absStore.dispatch(NgrxAction_ATH.__removeMfaState());
        if (!isDisabled) {
          await this._absRouter.navigateByUrl('/');
        }
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }
}
