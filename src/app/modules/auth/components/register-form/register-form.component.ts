/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 * Silesian University of Technology
 *
 *    File name: register-form.component.ts
 *    Last modified: 7/9/23, 8:22 PM
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
import { BirthDateValidator } from '~/shared-mod/validators/birth-date.validator';
import { requiredBoolValidator } from '~/shared-mod/validators/required-bool.validator';
import { passwordMatchValidator } from '~/shared-mod/validators/password-match.validator';
import {
  IRegister1stFormModel,
  IRegister2ndFormModel,
} from '~/auth-mod/models/register-form.model';

import { PasswordStrengthMeterComponent } from '~/shared-mod/components/password-strength-meter/password-strength-meter.component';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
      secondEmailAddress: new FormControl('', [Validators.email]),
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

  onMoveToNextStage(): void {
    this.nextFormStageActive = true;
  }

  onSubmitRegisterForm(): void {
    const data1stPart =
      this.register1stStageForm.getRawValue() as IRegister1stFormModel;
    const data2ndPart =
      this.register2ndStageForm.getRawValue() as IRegister2ndFormModel;
    // next
    console.log(data1stPart, data2ndPart);
  }
}
