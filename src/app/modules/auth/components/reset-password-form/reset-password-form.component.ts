/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: reset-password-form.component.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 21:01:50
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
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ResetPassword1stStageFormModel,
  ResetPassword2ndStageFormModel,
} from '~/auth-mod/models/reset-password-form.model';
import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';
import { exactLengthValidator } from '~/shared-mod/validators/exact-length.validator';
import { regex } from '~/shared-mod/validators/regex.constant';

@Component({
  selector: 'msph-reset-password-form',
  templateUrl: './reset-password-form.component.html',
})
export class ResetPasswordFormComponent {
  resetPassword1stStageForm: FormGroup;
  resetPassword2ndStageForm: FormGroup;
  nextFormStageActive = false;

  constructor(
    private readonly _router: Router,
    private readonly _formHelperService: FormHelperService
  ) {
    this.resetPassword1stStageForm = new FormGroup({
      usernameOrEmailAddress: new FormControl('', [
        Validators.required,
        Validators.pattern(regex.USERNAME_OR_EMAIL),
      ]),
    });
    this.resetPassword2ndStageForm = new FormGroup({
      token: new FormControl('', [
        Validators.required,
        Validators.pattern(regex.OTA_TOKEN),
        exactLengthValidator(10),
      ]),
    });
  }

  handleEmitOnAcceptCaptcha(): void {
    const formData =
      this.resetPassword1stStageForm.getRawValue() as ResetPassword1stStageFormModel;
    // on next
    console.log(formData);
    this.nextFormStageActive = true;
  }

  async handleSubmitResetPassword2ndStage(): Promise<void> {
    const formData =
      this.resetPassword2ndStageForm.getRawValue() as ResetPassword2ndStageFormModel;
    // on next
    console.log(formData);
    await this._router.navigate(['/auth/change-password/tokenData']);
  }
}
