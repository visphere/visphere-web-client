/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StartResetPasswordService } from '~/auth-mod/services/start-reset-password/start-reset-password.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { CaptchaVerificationService } from '~/shared-mod/services/captcha-verification/captcha-verification.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';
import { regex } from '~/shared-mod/validators/regex.constant';

@Component({
  selector: 'vsph-start-reset-password-form',
  templateUrl: './start-reset-password-form.component.html',
  providers: [
    StartResetPasswordService,
    PopulateFormGroupService,
    CaptchaVerificationService,
  ],
})
export class StartResetPasswordFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  startResetPasswordForm: FormGroup;

  isLoading$ = this._startResetPasswordService.isLoading$;

  constructor(
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _startResetPasswordService: StartResetPasswordService,
    private readonly _captchaVerificationService: CaptchaVerificationService
  ) {
    super();
    this.startResetPasswordForm = new FormGroup({
      usernameOrEmailAddress: new FormControl('', [
        Validators.required,
        Validators.pattern(regex.USERNAME_OR_EMAIL),
      ]),
    });
    this._startResetPasswordService.setReactiveForm(
      this.startResetPasswordForm
    );
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.startResetPasswordForm);
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleEmitOnAcceptCaptcha(): void {
    this.wrapAsObservable$(
      this._startResetPasswordService.submitForm$()
    ).subscribe();
  }

  handleSubmitStartResetPasswordForm(): void {
    this._captchaVerificationService.setModalVisibility(true);
  }
}
