/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  first,
  map,
  switchMap,
} from 'rxjs';
import { SharedHttpClientService } from '~/shared-mod/services/shared-http-client/shared-http-client.service';
import { QueryParamKey } from '~/shared-mod/types/query-param.type';
import { ExtendedValidatorErrors } from '~/shared-mod/types/validation.type';

@Injectable({ providedIn: 'root' })
export class AccountValueForAnotherExistValidator {
  constructor(
    private readonly _sharedHttpClientService: SharedHttpClientService
  ) {}

  validate(by: QueryParamKey): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ExtendedValidatorErrors> =>
      control.valueChanges.pipe(
        filter(value => value !== ''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value =>
          this._sharedHttpClientService.checkIfLoggedAccountValueAlreadyExist$(
            by,
            value
          )
        ),
        map(({ alreadyExist }) =>
          alreadyExist ? { exist: alreadyExist } : null
        ),
        first()
      );
  }
}