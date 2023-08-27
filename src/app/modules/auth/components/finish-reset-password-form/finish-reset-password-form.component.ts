/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: finish-reset-password-form.component.ts
 *   Created at: 2023-08-27, 00:11:14
 *   Last updated at: 2023-08-27, 00:11:14
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
import { Observable } from 'rxjs';
import { FinishResetPasswordService } from '~/auth-mod/services/finish-reset-password/finish-reset-password.service';
import { ResetPasswordService } from '~/auth-mod/services/reset-password/reset-password.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { exactLengthValidator } from '~/shared-mod/validators/exact-length.validator';
import { regex } from '~/shared-mod/validators/regex.constant';

@Component({
  selector: 'msph-finish-reset-password-form',
  templateUrl: './finish-reset-password-form.component.html',
  providers: [FinishResetPasswordService, PopulateFormGroupService],
})
export class FinishResetPasswordFormComponent {
  finishResetPasswordForm: FormGroup;

  isLoading$: Observable<boolean> = this._finishResetPasswordService.isLoading$;
  providedUserEmail$: Observable<string> =
    this._resetPasswordService.userEmail$;

  constructor(
    private readonly _resetPasswordService: ResetPasswordService,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _finishResetPasswordService: FinishResetPasswordService
  ) {
    this.finishResetPasswordForm = new FormGroup({
      token: new FormControl('', [
        Validators.required,
        Validators.pattern(regex.OTA_TOKEN),
        exactLengthValidator(10),
      ]),
    });
    this._populateFormGroupService.setField(this.finishResetPasswordForm);
    this._finishResetPasswordService.setReactiveForm(
      this.finishResetPasswordForm
    );
  }

  handleSubmitFinishResetPasswordForm(): void {
    this._finishResetPasswordService.submitForm();
  }

  handleResendMessage(): void {
    this._finishResetPasswordService.resendEmailMessage();
  }
}
