/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: start-reset-password-form.component.ts
 *   Created at: 2023-08-27, 00:10:52
 *   Last updated at: 2023-08-27, 00:10:52
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
import { BehaviorSubject, Observable } from 'rxjs';
import { StartResetPasswordService } from '~/auth-mod/services/start-reset-password/start-reset-password.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { regex } from '~/shared-mod/validators/regex.constant';

@Component({
  selector: 'msph-start-reset-password-form',
  templateUrl: './start-reset-password-form.component.html',
  providers: [StartResetPasswordService, PopulateFormGroupService],
})
export class StartResetPasswordFormComponent {
  startResetPasswordForm: FormGroup;

  captchaModalIsActive$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoading$: Observable<boolean> = this._startResetPasswordService.isLoading$;

  constructor(
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _startResetPasswordService: StartResetPasswordService
  ) {
    this.startResetPasswordForm = new FormGroup({
      usernameOrEmailAddress: new FormControl('', [
        Validators.required,
        Validators.pattern(regex.USERNAME_OR_EMAIL),
      ]),
    });
    this._populateFormGroupService.setField(this.startResetPasswordForm);
    this._startResetPasswordService.setReactiveForm(
      this.startResetPasswordForm
    );
  }

  handleEmitOnAcceptCaptcha(): void {
    this._startResetPasswordService.submitForm();
  }

  handleSubmitStartResetPasswordForm(): void {
    this.captchaModalIsActive$.next(true);
  }
}
