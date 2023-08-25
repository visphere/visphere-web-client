/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: register-form.component.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 21:01:16
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
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Register1stFormModel,
  Register2ndFormModel,
} from '~/auth-mod/models/register-form.model';
import { PasswordStrengthMeterComponent } from '~/shared-mod/components/password-strength-meter/password-strength-meter.component';
import { BirthDateValidator } from '~/shared-mod/validators/birth-date.validator';
import { emailWithSecondaryEmail } from '~/shared-mod/validators/email-with-secondary-email.validator';
import { passwordMatchValidator } from '~/shared-mod/validators/password-match.validator';
import { regex } from '~/shared-mod/validators/regex.constant';
import { requiredBoolValidator } from '~/shared-mod/validators/required-bool.validator';

@Component({
  selector: 'msph-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent implements AfterViewInit {
  register1stStageForm: FormGroup;
  register2ndStageForm: FormGroup;
  nextFormStageActive = false;

  @ViewChild('passwordStrengthMeter')
  passwordStrengthMeterComponent!: PasswordStrengthMeterComponent;

  constructor(private readonly _birthDateValidator: BirthDateValidator) {
    this.register1stStageForm = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(regex.USERNAME),
        ]),
        emailAddress: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(regex.PASSWORD),
        ]),
        confirmedPassword: new FormControl('', [Validators.required]),
        birthDate: new FormControl(
          { day: null, month: null, year: null },
          this._birthDateValidator.validate()
        ),
      },
      { validators: passwordMatchValidator('password', 'confirmedPassword') }
    );
    this.register2ndStageForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      secondEmailAddress: new FormControl('', [
        Validators.email,
        emailWithSecondaryEmail(this.register1stStageForm, 'emailAddress'),
      ]),
      allowNotifs: new FormControl(false),
      agreeTerms: new FormControl(false, [requiredBoolValidator()]),
    });
  }

  ngAfterViewInit(): void {
    this.passwordStrengthMeterComponent?.debounceCalcStrength();
  }

  get checkIfFormIsInvalid(): boolean {
    const agreeTermsControl = this.register2ndStageForm.get('agreeTerms');
    if (!agreeTermsControl) return true;
    return (
      this.register1stStageForm.invalid ||
      this.register2ndStageForm.invalid ||
      !agreeTermsControl.value
    );
  }

  handleMoveToNextStage(): void {
    this.nextFormStageActive = true;
  }

  handleEmitOnAcceptCaptcha(): void {
    const data1stPart =
      this.register1stStageForm.getRawValue() as Register1stFormModel;
    const data2ndPart =
      this.register2ndStageForm.getRawValue() as Register2ndFormModel;
    // next
    console.log(data1stPart, data2ndPart);
  }
}
