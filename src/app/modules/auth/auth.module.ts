/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 * Silesian University of Technology
 *
 *    File name: auth.module.ts
 *    Last modified: 7/4/23, 3:44 PM
 *    Project name: moonsphere
 *    Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This is a project completing a
 * engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */

import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import * as BtsIcon from '@ng-icons/bootstrap-icons';

import { AuthRootComponent } from '~/auth-mod/auth-root.component';
import { AuthRoutingModule } from '~/auth-mod/auth-routing.module';

import { SharedModule } from '~/shared-mod/shared.module';

import { AuthLoginPageComponent } from '~/auth-mod/pages/auth-login-page/auth-login-page.component';
import { AuthRegisterPageComponent } from '~/auth-mod/pages/auth-register-page/auth-register-page.component';
import { AuthResetPasswordPageComponent } from '~/auth-mod/pages/auth-reset-password-page/auth-reset-password-page.component';
import { AuthChangePasswordPageComponent } from '~/auth-mod/pages/auth-change-password-page/auth-change-password-page.component';

import { LoginFormComponent } from '~/auth-mod/components/login-form/login-form.component';
import { AuthContentWrapperComponent } from '~/auth-mod/components/auth-content-wrapper/auth-content-wrapper.component';
import { Oauth2ButtonComponent } from '~/auth-mod/components/oauth2-button/oauth2-button.component';
import { PasswordInputTogglerComponent } from '~/auth-mod/components/password-input-toggler/password-input-toggler.component';
import { FooterComponent } from '~/auth-mod/components/footer/footer.component';
import { AuthFormHeaderComponent } from '~/auth-mod/components/auth-form-header/auth-form-header.component';
import { FooterControlsComponent } from '~/auth-mod/components/footer-controls/footer-controls.component';
import { FooterControlListComponent } from '~/auth-mod/components/footer-control-list/footer-control-list.component';
import { RegisterFormComponent } from '~/auth-mod/components/register-form/register-form.component';
import { ResetPasswordFormComponent } from '~/auth-mod/components/reset-password-form/reset-password-form.component';
import { ChangePasswordFormComponent } from '~/auth-mod/components/change-password-form/change-password-form.component';
import { AuthCommonFormInputComponent } from '~/auth-mod/components/auth-common-form-input/auth-common-form-input.component';
import { FieldValidatorComponent } from '~/auth-mod/components/field-validator/field-validator.component';
import { AuthSingleSelectSpinnerComponent } from '~/auth-mod/components/auth-single-select-spinner/auth-single-select-spinner.component';
import { BirthDateSelectSpinnerComponent } from '~/auth-mod/components/birth-date-select-spinner/birth-date-select-spinner.component';
import { AuthCheckboxFormInputComponent } from '~/auth-mod/components/auth-checkbox-form-input/auth-checkbox-form-input.component';
import { RegisterFormConsentsComponent } from '~/auth-mod/components/register-form-consents/register-form-consents.component';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@NgModule({
  declarations: [
    // components
    LoginFormComponent,
    AuthContentWrapperComponent,
    Oauth2ButtonComponent,
    PasswordInputTogglerComponent,
    FooterComponent,
    AuthFormHeaderComponent,
    FooterControlsComponent,
    FooterControlListComponent,
    RegisterFormComponent,
    ResetPasswordFormComponent,
    ChangePasswordFormComponent,
    AuthCommonFormInputComponent,
    FieldValidatorComponent,
    AuthSingleSelectSpinnerComponent,
    BirthDateSelectSpinnerComponent,
    AuthCheckboxFormInputComponent,
    RegisterFormConsentsComponent,
    // pages
    AuthLoginPageComponent,
    AuthRegisterPageComponent,
    AuthResetPasswordPageComponent,
    AuthChangePasswordPageComponent,
    // root page
    AuthRootComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    TranslateModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    NgIconsModule.withIcons({
      selectArrowDown: BtsIcon.bootstrapCaretDownFill,
      lightModeIcon: BtsIcon.bootstrapSunFill,
      darkModeIcon: BtsIcon.bootstrapMoonStarsFill,
      systemModeIcon: BtsIcon.bootstrapCircleHalf,
    }),
  ],
})
export class AuthModule {}
