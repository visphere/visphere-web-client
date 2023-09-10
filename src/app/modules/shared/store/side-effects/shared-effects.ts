/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { delay, tap } from 'rxjs';
import * as NgrxAction from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

@Injectable()
export class SharedEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store<SharedReducer>
  ) {}

  debounceSnackbarAfterOpen$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(NgrxAction.__addSnackbar),
        delay(4000),
        tap(() => {
          this._store.dispatch(NgrxAction.__removeSnackbar({}));
        })
      ),
    { dispatch: false }
  );
}
