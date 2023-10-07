/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { AbstractControl } from '@angular/forms';
import { FcValidatorErrors } from '../types/validation.type';

export function exactLengthValidator(length: number): FcValidatorErrors {
  return (control: AbstractControl) => {
    const value: string = control.value;
    if (value && value.length !== length) {
      return { exactLength: true };
    }
    return null;
  };
}
