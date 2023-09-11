/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '~/auth-mod/services/register/register.service';
import { CaptchaVerificationService } from '~/shared-mod/services/captcha-verification/captcha-verification.service';
import { BirthDateValidator } from '~/shared-mod/validators/birth-date.validator';
import { emailWithSecondaryEmail } from '~/shared-mod/validators/email-with-secondary-email.validator';
import { passwordMatchValidator } from '~/shared-mod/validators/password-match.validator';
import { regex } from '~/shared-mod/validators/regex.constant';
import { requiredBoolValidator } from '~/shared-mod/validators/required-bool.validator';

@Component({
  selector: 'msph-register-form',
  templateUrl: './register-form.component.html',
  providers: [RegisterService, CaptchaVerificationService],
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  currentStage$ = this._registerService.currentStage$;
  captchaModalState$ = this._registerService.captchaModalState$;

  constructor(
    private readonly _birthDateValidator: BirthDateValidator,
    private readonly _registerService: RegisterService,
    private readonly _captchaVerificationService: CaptchaVerificationService
  ) {
    this.registerForm = new FormGroup(
      {
        firstStage: new FormGroup(
          {
            username: new FormControl('', [
              Validators.required,
              Validators.minLength(3),
              Validators.pattern(regex.USERNAME),
            ]),
            emailAddress: new FormControl('', [
              Validators.required,
              Validators.email,
            ]),
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

  handleEmitOnAcceptCaptcha(): void {
    this._registerService.submitForm();
  }

  handleSubmitRegisterForm(): void {
    this._captchaVerificationService.setModalVisibility(true);
  }
}
