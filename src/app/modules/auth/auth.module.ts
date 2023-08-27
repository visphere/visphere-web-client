/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auth.module.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 20:56:22
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
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as BtsIcon from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AuthRootComponent } from '~/auth-mod/auth-root.component';
import { AuthRoutingModule } from '~/auth-mod/auth-routing.module';
import { ActivateAccountFormComponent } from '~/auth-mod/components/activate-account/activate-account-form.component';
import { AuthCheckboxFormInputComponent } from '~/auth-mod/components/auth-checkbox-form-input/auth-checkbox-form-input.component';
import { AuthCommonFormInputComponent } from '~/auth-mod/components/auth-common-form-input/auth-common-form-input.component';
import { AuthContentWrapperComponent } from '~/auth-mod/components/auth-content-wrapper/auth-content-wrapper.component';
import { AuthFormHeaderComponent } from '~/auth-mod/components/auth-form-header/auth-form-header.component';
import { AuthSingleSelectSpinnerComponent } from '~/auth-mod/components/auth-single-select-spinner/auth-single-select-spinner.component';
import { BirthDateSelectSpinnerComponent } from '~/auth-mod/components/birth-date-select-spinner/birth-date-select-spinner.component';
import { ChangePasswordFormComponent } from '~/auth-mod/components/change-password-form/change-password-form.component';
import { FinishResetPasswordFormComponent } from '~/auth-mod/components/finish-reset-password-form/finish-reset-password-form.component';
import { FooterControlListComponent } from '~/auth-mod/components/footer-control-list/footer-control-list.component';
import { FooterControlsComponent } from '~/auth-mod/components/footer-controls/footer-controls.component';
import { FooterComponent } from '~/auth-mod/components/footer/footer.component';
import { LoginFormComponent } from '~/auth-mod/components/login-form/login-form.component';
import { Oauth2ButtonComponent } from '~/auth-mod/components/oauth2-button/oauth2-button.component';
import { PasswordInputTogglerComponent } from '~/auth-mod/components/password-input-toggler/password-input-toggler.component';
import { RegisterFirstStageFormComponent } from '~/auth-mod/components/register-first-stage-form/register-first-stage-form.component';
import { RegisterFormConsentsComponent } from '~/auth-mod/components/register-form-consents/register-form-consents.component';
import { RegisterFormComponent } from '~/auth-mod/components/register-form/register-form.component';
import { RegisterSecondStageFormComponent } from '~/auth-mod/components/register-second-stage-form/register-second-stage-form.component';
import { StartResetPasswordFormComponent } from '~/auth-mod/components/start-reset-password-form/start-reset-password-form.component';
import { ActivateAccountGuard } from '~/auth-mod/guards/activate-account/activate-account.guard';
import { AuthActivateAccountPageComponent } from '~/auth-mod/pages/auth-activate-account-page/auth-activate-account-page.component';
import { AuthChangePasswordPageComponent } from '~/auth-mod/pages/auth-change-password-page/auth-change-password-page.component';
import { AuthLoginPageComponent } from '~/auth-mod/pages/auth-login-page/auth-login-page.component';
import { AuthRegisterPageComponent } from '~/auth-mod/pages/auth-register-page/auth-register-page.component';
import { AuthResetPasswordPageComponent } from '~/auth-mod/pages/auth-reset-password-page/auth-reset-password-page.component';
import { authReduxStore } from '~/auth-mod/store/reducer';
import { SharedModule } from '~/shared-mod/shared.module';

@NgModule({
  declarations: [
    // components
    ActivateAccountFormComponent,
    AuthCheckboxFormInputComponent,
    AuthCommonFormInputComponent,
    AuthContentWrapperComponent,
    AuthFormHeaderComponent,
    AuthSingleSelectSpinnerComponent,
    BirthDateSelectSpinnerComponent,
    ChangePasswordFormComponent,
    FinishResetPasswordFormComponent,
    FooterControlListComponent,
    FooterControlsComponent,
    FooterComponent,
    LoginFormComponent,
    Oauth2ButtonComponent,
    PasswordInputTogglerComponent,
    RegisterFirstStageFormComponent,
    RegisterFormConsentsComponent,
    RegisterFormComponent,
    RegisterSecondStageFormComponent,
    StartResetPasswordFormComponent,
    // pages
    AuthActivateAccountPageComponent,
    AuthChangePasswordPageComponent,
    AuthLoginPageComponent,
    AuthRegisterPageComponent,
    AuthResetPasswordPageComponent,
    // root page
    AuthRootComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    NgIconsModule.withIcons({
      arrowLeftIcon: BtsIcon.bootstrapArrowLeft,
      darkModeIcon: BtsIcon.bootstrapMoonStarsFill,
      eyeIcon: BtsIcon.bootstrapEye,
      eyeSlashIcon: BtsIcon.bootstrapEyeSlash,
      lightModeIcon: BtsIcon.bootstrapSunFill,
      outsideLinkIcon: BtsIcon.bootstrapArrowReturnLeft,
      selectArrowDownIcon: BtsIcon.bootstrapCaretDownFill,
      systemModeIcon: BtsIcon.bootstrapCircleHalf,
    }),
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature(
      authReduxStore.reducerName,
      authReduxStore.reducerFunction
    ),
    TranslateModule,
  ],
  providers: [ActivateAccountGuard],
})
export class AuthModule {}
