/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { TimeUtilsService } from '~/shared-mod/services/time-utils/time-utils.service';
import { ExtendedValidatorErrors } from '../types/validation.type';

@Injectable({ providedIn: 'root' })
export class BirthDateValidator {
  constructor(private readonly _timeUtilsService: TimeUtilsService) {}

  validate(): ValidatorFn {
    return (control: AbstractControl): ExtendedValidatorErrors => {
      if (!control.touched) {
        return null;
      }
      const countOfNulls = Object.values(control.value).filter(v => !v).length;
      if (countOfNulls === 0) {
        if (!this._timeUtilsService.checkIfDateIsValid(control.value)) {
          return { invalid: true };
        }
        if (!this._timeUtilsService.checkIfUserHas13YearsOld(control.value)) {
          return { inappropriateAge: true };
        }
        return null;
      }
      if (countOfNulls < 3 && countOfNulls > 0) {
        return { notAll: true };
      }
      if (countOfNulls === 3) {
        return { required: true };
      }
      return null;
    };
  }
}
