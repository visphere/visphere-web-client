/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs';
import * as NgrxAction from '~/auth-mod/store/actions';
import * as NgrxSelector from '~/auth-mod/store/selectors';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';

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
          NgrxAction.__addNewMySavedAccount,
          NgrxAction.__removeMySavedAccount,
          NgrxAction.__removeAllMySavedAccount,
          NgrxAction.__setMySavedAccountVerified
        ),
        withLatestFrom(this._store.select(NgrxSelector.selectMySavedAccounts)),
        tap(([, state]) => {
          this._localStorageService.save('mySavedAccounts', state);
        })
      ),
    { dispatch: false }
  );
}
