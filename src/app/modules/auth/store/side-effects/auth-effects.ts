/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import {
  actionAddNewMySavedAccount,
  actionRemoveAllMySavedAccount,
  actionRemoveMySavedAccount,
  actionSetMySavedAccountVerified,
} from '../actions';
import { selectMySavedAccounts } from '../selectors';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store<AuthReducer>,
    private readonly _localStorageService: LocalStorageService
  ) {}

  myAccountsinteractWithLocalStorage$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          actionAddNewMySavedAccount,
          actionRemoveMySavedAccount,
          actionRemoveAllMySavedAccount,
          actionSetMySavedAccountVerified
        ),
        withLatestFrom(this._store.select(selectMySavedAccounts)),
        tap(([, state]) => {
          this._localStorageService.save('mySavedAccounts', state);
        })
      ),
    { dispatch: false }
  );
}
