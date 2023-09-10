/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
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
