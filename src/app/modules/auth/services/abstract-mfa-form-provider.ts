/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LoginResDtoModel } from '~/shared-mod/models/identity.model';
import { AbstractSimpleFormProvider } from '~/shared-mod/services/abstract-simple-form-provider';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import {
  actionOpenDisabledAccountModal,
  actionSetLoggedUserDetails,
} from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { MfaStateModel } from '../models/mfa-data.model';
import { actionRemoveMfaState } from '../store/actions';
import { selectMfaState } from '../store/selectors';
import { AuthReducer } from '../types/ngrx-store.type';

export abstract class AbstractMfaFormProvider extends AbstractSimpleFormProvider<LoginResDtoModel> {
  protected _mfaState!: MfaStateModel;

  constructor(
    private readonly _absStore: Store<AuthReducer | SharedReducer>,
    private readonly _absRouter: Router,
    private readonly _absLocalStorageService: LocalStorageService
  ) {
    super();
    this.wrapAsObservable$(this._absStore.select(selectMfaState)).subscribe(
      state => {
        if (state) {
          this._mfaState = state;
        }
      }
    );
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
            ? actionOpenDisabledAccountModal({ accessToken })
            : actionSetLoggedUserDetails({
                details: res,
              })
        );
        this._absStore.dispatch(actionRemoveMfaState());
        if (!isDisabled) {
          let navigateUrl = '/';
          const memorizedPath = this._absLocalStorageService.get<string>(
            `memorizedPath+${res.username}`
          );
          if (memorizedPath) {
            navigateUrl = memorizedPath;
          }
          await this._absRouter.navigateByUrl(navigateUrl);
        }
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }
}
