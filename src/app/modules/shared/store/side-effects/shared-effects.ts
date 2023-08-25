/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: shared-effects.ts
 *   Created at: 2023-08-23, 10:26:58
 *   Last updated at: 2023-08-23, 10:26:58
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
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
