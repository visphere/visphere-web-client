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
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginService } from '~/auth-mod/services/login/login.service';
import { LoginFormStage } from '~/auth-mod/types/form-stage.type';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'msph-login-form',
  templateUrl: './login-form.component.html',
  providers: [LoginService, PopulateFormGroupService],
})
export class LoginFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  loginForm: FormGroup;
  nextButtonEnabled = false;

  activeStage$: Observable<LoginFormStage> = this._loginService.currentStage$;
  isNextButtonEnabled$: Observable<boolean> =
    this._loginService.isNextButtonEnabled$;
  isLoading$: Observable<boolean> = this._loginService.isLoading$;

  constructor(
    private readonly _loginService: LoginService,
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    super();
    this.loginForm = new FormGroup({
      usernameOrEmailAddress: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this._loginService.setReactiveForm(this.loginForm);
    this._loginService.onValueChange();
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.loginForm);
    this.wrapAsObservable(this._loginService.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleMoveForward(): void {
    this._loginService.moveForward();
  }

  handleMoveBackward(): void {
    this._loginService.moveBackward();
  }

  handleSubmitLoginForm(): void {
    this._loginService.submitForm();
  }
}
