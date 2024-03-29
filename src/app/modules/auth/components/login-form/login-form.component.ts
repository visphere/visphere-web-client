/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '~/auth-mod/services/login/login.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-login-form',
  templateUrl: './login-form.component.html',
  providers: [LoginService, PopulateFormGroupService],
})
export class LoginFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  loginForm: FormGroup;
  nextButtonEnabled = false;

  activeStage$ = this._loginService.currentStage$;
  isNextButtonEnabled$ = this._loginService.isNextButtonEnabled$;
  isLoading$ = this._loginService.isLoading$;

  constructor(
    private readonly _loginService: LoginService,
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    super();
    this.loginForm = new FormGroup({
      usernameOrEmailAddress: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberAccount: new FormControl(true),
    });
    this._loginService.setReactiveForm(this.loginForm);
    this._loginService.onValueChange();
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.loginForm);
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
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
    this.wrapAsObservable$(this._loginService.submitForm$()).subscribe({
      error: () => this.loginForm.get('password')?.reset(),
    });
  }
}
