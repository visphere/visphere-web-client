/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 * Silesian University of Technology
 *
 *    File name: change-password-form.component.ts
 *    Last modified: 7/10/23, 8:54 PM
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

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { regex } from '~/shared-mod/validators/regex.constant';
import { passwordMatchValidator } from '~/shared-mod/validators/password-match.validator';
import { IChangePasswordFormModel } from '~/auth-mod/models/change-password-form.model';
import { PasswordStrengthMeterComponent } from '~/shared-mod/components/password-strength-meter/password-strength-meter.component';

import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'msph-change-password-form',
  templateUrl: './change-password-form.component.html',
})
export class ChangePasswordFormComponent implements AfterViewInit {
  newPasswordFormGroup: FormGroup;
  successfullSetNewPassword = false;

  @ViewChild('passwordStrengthMeter')
  passwordStrengthMeterComponent!: PasswordStrengthMeterComponent;

  constructor(private readonly _formHelperService: FormHelperService) {
    this.newPasswordFormGroup = new FormGroup(
      {
        newPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(regex.PASSWORD),
        ]),
        confirmedNewPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: passwordMatchValidator(
          'newPassword',
          'confirmedNewPassword'
        ),
      }
    );
  }

  onSubmitSetNewPassword(): void {
    const formData =
      this.newPasswordFormGroup.getRawValue() as IChangePasswordFormModel;
    // next
    console.log(formData);
    this.successfullSetNewPassword = true;
  }

  ngAfterViewInit(): void {
    this.passwordStrengthMeterComponent.debounceCalcStrength();
  }
}
