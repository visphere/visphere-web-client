/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: register-second-stage-form.component.spec.ts
 *   Created at: 2023-08-26, 16:03:09
 *   Last updated at: 2023-08-26, 16:03:38
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
