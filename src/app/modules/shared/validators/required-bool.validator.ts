/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { AbstractControl } from '@angular/forms';

type ReturnType = (
  control: AbstractControl
) => { [key: string]: boolean } | null;

export function requiredBoolValidator(): ReturnType {
  return (control: AbstractControl) => {
    if (Boolean(!control.value) && control.touched) {
      return { required: true };
    }
    return null;
  };
}
