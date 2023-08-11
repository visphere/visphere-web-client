/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auth-common-form-input.component.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 01:39:35
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This is a project
 * completing a engineers degree in computer science at Silesian University of Technology.
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
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';

@Component({
  selector: 'msph-auth-common-form-input',
  templateUrl: './auth-common-form-input.component.html',
})
export class AuthCommonFormInputComponent {
  @Input() formGroup!: FormGroup;
  @Input() formControlIdentifier!: string;
  @Input() maxLength!: number;
  @Input() type = 'text';
  @Input() i18nLabel!: string;
  @Input() placeholder = '';
  @Input() requiredStar = false;

  constructor(private readonly _formHelperService: FormHelperService) {}

  isFieldInvalid(): boolean {
    return this._formHelperService.validateField(
      this.formGroup,
      this.formControlIdentifier
    );
  }
}
