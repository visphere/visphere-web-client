/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: form-helper.service.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 20:53:28
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
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormHelperService {
  validateField(formGroup: FormGroup, formControlName: string): boolean {
    const formControl = formGroup.get(formControlName);
    if (!formControl) {
      throw new Error(`Form control name ${formControlName} not exist`);
    }
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  checkError(
    formGroup: FormGroup,
    formControlName: string,
    type: string
  ): boolean {
    return (
      this.getOnlyFirstError(formGroup.get(formControlName)!.errors) === type
    );
  }

  getOnlyFirstError(errors: ValidationErrors | null): string | null {
    if (!errors) {
      return null;
    }
    const keys = Object.keys(errors);
    if (keys && keys.length > 0) {
      return keys[0];
    }
    return null;
  }

  toggleFormField(
    formGroup: FormGroup,
    formControlName: string,
    isDisabled: boolean
  ): void {
    const formControl = formGroup.get(formControlName);
    if (isDisabled) {
      formControl?.disable();
    } else {
      formControl?.enable();
    }
  }
}
