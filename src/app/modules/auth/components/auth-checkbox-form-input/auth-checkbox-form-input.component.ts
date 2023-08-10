/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auth-checkbox-form-input.component.ts
 *    Last modified: 7/13/23, 6:25 PM
 *    Project name: moonsphere
 *    Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This is a project completing a
 * engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */

import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';

@Component({
  selector: 'msph-auth-checkbox-form-input',
  templateUrl: './auth-checkbox-form-input.component.html',
})
export class AuthCheckboxFormInputComponent {
  @Input() formGroup!: FormGroup;
  @Input() formControlIdentifier!: string;

  constructor(private readonly _formHelperService: FormHelperService) {}

  handleSetDirtyAndTouched(): void {
    const control = this.formGroup.get(this.formControlIdentifier);
    control?.markAsDirty();
    control?.markAsTouched();
  }
}
