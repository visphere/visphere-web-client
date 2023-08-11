/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: login-form.component.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 21:00:38
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
import { ILoginFormModel } from '~/auth-mod/models/login-form.model';

@Component({
  selector: 'msph-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  loginForm: FormGroup;
  loginOrEmailProvided = false;
  nextButtonEnabled = false;

  constructor() {
    this.loginForm = new FormGroup({
      usernameOrEmailAddress: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  changeNextButtonState(): void {
    this.nextButtonEnabled = Boolean(
      this.loginForm.get('usernameOrEmailAddress')?.value.length !== 0
    );
  }

  moveForward(): void {
    this.loginOrEmailProvided = true;
  }

  moveBackward(): void {
    this.loginOrEmailProvided = false;
    this.loginForm.get('password')?.reset();
  }

  onSubmitLoginForm(): void {
    const formData: ILoginFormModel =
      this.loginForm.getRawValue() as ILoginFormModel;
    // next
    console.log(formData);
  }
}
