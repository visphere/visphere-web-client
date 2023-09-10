/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { AbstractControl } from '@angular/forms';

type ReturnType = (
  control: AbstractControl
) => { [key: string]: boolean } | null;

export function passwordMatchValidator(
  rootPasswordFieldName: string,
  confirmedPasswordFieldName: string
): ReturnType {
  return (control: AbstractControl) => {
    const password = control.get(rootPasswordFieldName);
    const confirmedPassword = control.get(confirmedPasswordFieldName);
    if (password?.value !== confirmedPassword?.value) {
      confirmedPassword?.setErrors({
        ...confirmedPassword.errors,
        mismatch: true,
      });
      return { mismatch: true };
    }
    if (confirmedPassword?.errors && confirmedPassword.errors['mismatch']) {
      delete confirmedPassword.errors['mismatch'];
      if (Object.keys(confirmedPassword.errors).length === 0) {
        confirmedPassword.setErrors(null);
      }
    }
    return null;
  };
}
