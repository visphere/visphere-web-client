/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { AbstractControl } from '@angular/forms';

type ReturnType = (
  control: AbstractControl
) => { [key: string]: boolean } | null;

export function exactLengthValidator(length: number): ReturnType {
  return (control: AbstractControl) => {
    const value: string = control.value;
    if (value && value.length !== length) {
      return { exactLength: true };
    }
    return null;
  };
}
