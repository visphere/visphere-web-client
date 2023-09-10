/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { AbstractControl } from '@angular/forms';

type FieldProp = {
  nestedForm?: string;
  formField: string;
};

type Props = {
  primary: FieldProp;
  secondary: FieldProp;
};

type ReturnType = (
  control: AbstractControl
) => { [key: string]: boolean } | null;

export function emailWithSecondaryEmail({
  primary,
  secondary,
}: Props): ReturnType {
  const checkIfFieldIsNestedAndReturnValue = (
    control: AbstractControl,
    field: FieldProp
  ): AbstractControl => {
    if (field.nestedForm) {
      return control.get(field.nestedForm)!.get(field.formField)!;
    }
    return control.get(field.formField)!;
  };

  return (control: AbstractControl) => {
    const primaryEmail = checkIfFieldIsNestedAndReturnValue(control, primary);
    const secondaryEmail = checkIfFieldIsNestedAndReturnValue(
      control,
      secondary
    );
    if (primaryEmail.value === secondaryEmail.value) {
      secondaryEmail.setErrors({
        ...secondaryEmail.errors,
        exact: true,
      });
      return { exact: true };
    }
    if (secondaryEmail.errors && secondaryEmail.errors['exact']) {
      delete secondaryEmail.errors['mismatch'];
      if (Object.keys(secondaryEmail.errors).length === 0) {
        secondaryEmail.setErrors(null);
      }
    }
    return null;
  };
}
