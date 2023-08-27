/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: email-with-secondary-email.validator.ts
 *   Created at: 2023-08-20, 17:25:17
 *   Last updated at: 2023-08-20, 17:25:17
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
