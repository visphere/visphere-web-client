/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthModule } from '~/auth-mod/auth.module';
import { RegisterService } from '~/auth-mod/services/register/register.service';
import { AppModule } from '~/root-mod/app.module';
import { BirthDateValidator } from '~/shared-mod/validators/birth-date.validator';
import { emailWithSecondaryEmail } from '~/shared-mod/validators/email-with-secondary-email.validator';
import { passwordMatchValidator } from '~/shared-mod/validators/password-match.validator';
import { regex } from '~/shared-mod/validators/regex.constant';
import { requiredBoolValidator } from '~/shared-mod/validators/required-bool.validator';
import { RegisterSecondStageFormComponent } from './register-second-stage-form.component';

describe('RegisterSecondStageFormComponent', () => {
  let component: RegisterSecondStageFormComponent;
  let fixture: ComponentFixture<RegisterSecondStageFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      declarations: [RegisterSecondStageFormComponent],
      providers: [RegisterService],
    });

    const registerService = TestBed.inject(RegisterService);
    const birthDateValidator = TestBed.inject(BirthDateValidator);

    const formGroup = new FormGroup(
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
              birthDateValidator.validate()
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
          enabledMfa: new FormControl(true),
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
    registerService.setReactiveForm(formGroup);

    fixture = TestBed.createComponent(RegisterSecondStageFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
