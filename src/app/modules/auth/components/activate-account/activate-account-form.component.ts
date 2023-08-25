/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: activate-account-form.component.ts
 *   Created at: 2023-08-25, 22:00:33
 *   Last updated at: 2023-08-25, 22:00:33
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
import { ActivateAccountFormModel } from '~/auth-mod/models/activate-account-form.model';
import { exactLengthValidator } from '~/root-mod/modules/shared/validators/exact-length.validator';
import { regex } from '~/root-mod/modules/shared/validators/regex.constant';

@Component({
  selector: 'msph-activate-account-form',
  templateUrl: './activate-account-form.component.html',
})
export class ActivateAccountFormComponent {
  activateAccountForm: FormGroup;
  isActivated = false;

  constructor() {
    this.activateAccountForm = new FormGroup({
      token: new FormControl('', [
        Validators.required,
        Validators.pattern(regex.OTA_TOKEN),
        exactLengthValidator(10),
      ]),
    });
  }

  handleSubmitactivateAccount(): void {
    const formData =
      this.activateAccountForm.getRawValue() as ActivateAccountFormModel;
    // on next
    console.log(formData);
    this.isActivated = true;
  }

  handleResendMessage(): void {
    console.log('resend email message');
  }
}
