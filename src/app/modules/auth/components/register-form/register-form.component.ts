/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '~/auth-mod/services/register/register.service';
import { AccountValueAlreadyExistValidator } from '~/auth-mod/validators/account-value-already-exist.validator';
import { CaptchaVerificationService } from '~/shared-mod/services/captcha-verification/captcha-verification.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';
import { BirthDateValidator } from '~/shared-mod/validators/birth-date.validator';
import { composeToAsync } from '~/shared-mod/validators/compose-to-async';
import { emailWithSecondaryEmail } from '~/shared-mod/validators/email-with-secondary-email.validator';
import { passwordMatchValidator } from '~/shared-mod/validators/password-match.validator';
import { regex } from '~/shared-mod/validators/regex.constant';
import { requiredBoolValidator } from '~/shared-mod/validators/required-bool.validator';

@Component({
  selector: 'vsph-register-form',
  templateUrl: './register-form.component.html',
  providers: [RegisterService, CaptchaVerificationService],
})
export class RegisterFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  registerForm: FormGroup;
  currentStage$ = this._registerService.currentStage$;
  captchaModalState$ = this._registerService.captchaModalState$;

  constructor(
    private readonly _birthDateValidator: BirthDateValidator,
    private readonly _registerService: RegisterService,
    private readonly _captchaVerificationService: CaptchaVerificationService,
    private readonly _accountValueAlreadyExistValidator: AccountValueAlreadyExistValidator
  ) {
    super();
    this.registerForm = new FormGroup(
      {
        firstStage: new FormGroup(
          {
            username: new FormControl(
              '',
              null,
              Validators.composeAsync([
                composeToAsync(Validators.required),
                composeToAsync(Validators.minLength(3)),
                composeToAsync(Validators.pattern(regex.USERNAME)),
                this._accountValueAlreadyExistValidator.validate('username'),
              ])
            ),
            emailAddress: new FormControl(
              '',
              null,
              Validators.composeAsync([
                composeToAsync(Validators.required),
                composeToAsync(Validators.email),
                this._accountValueAlreadyExistValidator.validate('email'),
              ])
            ),
            password: new FormControl('', [
              Validators.required,
              Validators.pattern(regex.PASSWORD),
            ]),
            confirmedPassword: new FormControl('', [Validators.required]),
            birthDate: new FormControl(
              { day: null, month: null, year: null },
              this._birthDateValidator.validate()
            ),
          },
          {
            validators: passwordMatchValidator('password', 'confirmedPassword'),
          }
        ),
        secondStage: new FormGroup({
          firstName: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
          ]),
          lastName: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
          ]),
          secondEmailAddress: new FormControl('', [Validators.email]),
          allowNotifs: new FormControl(false),
          agreeTerms: new FormControl(false, [requiredBoolValidator()]),
          enabledMfa: new FormControl(true),
        }),
      },
      {
        validators: emailWithSecondaryEmail({
          primary: { nestedForm: 'firstStage', formField: 'emailAddress' },
          secondary: {
            nestedForm: 'secondStage',
            formField: 'secondEmailAddress',
          },
        }),
      }
    );
  }

  ngOnInit(): void {
    this._registerService.setReactiveForm(this.registerForm);
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleEmitOnAcceptCaptcha(): void {
    this.wrapAsObservable$(this._registerService.submitForm$()).subscribe();
  }

  handleSubmitRegisterForm(): void {
    this._captchaVerificationService.setModalVisibility(true);
  }
}
