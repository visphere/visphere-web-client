/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StartResetPasswordService } from '~/auth-mod/services/start-reset-password/start-reset-password.service';
import { CaptchaVerificationService } from '~/root-mod/modules/shared/services/captcha-verification/captcha-verification.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';
import { regex } from '~/shared-mod/validators/regex.constant';

@Component({
  selector: 'msph-start-reset-password-form',
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

  isLoading$: Observable<boolean> = this._startResetPasswordService.isLoading$;

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
    this.wrapAsObservable(this._startResetPasswordService.isLoading$).subscribe(
      isLoading => this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleEmitOnAcceptCaptcha(): void {
    this.wrapAsObservable(
      this._startResetPasswordService.submitForm()
    ).subscribe();
  }

  handleSubmitStartResetPasswordForm(): void {
    this._captchaVerificationService.setModalVisibility(true);
  }
}
