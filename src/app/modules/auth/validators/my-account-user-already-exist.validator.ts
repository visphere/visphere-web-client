/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  switchMap,
} from 'rxjs';
import * as NgrxSelector_ATH from '~/auth-mod/store/selectors';
import { ExtendedValidatorErrors } from '~/shared-mod/types/validation.type';
import { AuthReducer } from '../types/ngrx-store.type';

@Injectable({ providedIn: 'root' })
export class MyAcccountUserAlreadyExistValidator {
  constructor(private readonly _store: Store<AuthReducer>) {}

  validate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ExtendedValidatorErrors> =>
      control.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value =>
          this._store.select(
            NgrxSelector_ATH.checkIfMySavedAccountAlreadyExist(value)
          )
        ),
        map(alreadyExist => (alreadyExist ? { exist: alreadyExist } : null)),
        first()
      );
  }
}
