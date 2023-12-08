/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as BtsIcon from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { AuthRootComponent } from '~/auth-mod/auth-root.component';
import { AuthRoutingModule } from '~/auth-mod/auth-routing.module';
import { ActivateAccountFormComponent } from '~/auth-mod/components/activate-account/activate-account-form.component';
import { AddMyAccountModalComponent } from '~/auth-mod/components/add-my-account-modal/add-my-account-modal.component';
import { AgreeTermsContentComponent } from '~/auth-mod/components/agree-terms-content/agree-terms-content.component';
import { AuthContentWrapperComponent } from '~/auth-mod/components/auth-content-wrapper/auth-content-wrapper.component';
import { AuthFormHeaderComponent } from '~/auth-mod/components/auth-form-header/auth-form-header.component';
import { ChangePasswordFormComponent } from '~/auth-mod/components/change-password-form/change-password-form.component';
import { FillDataFormComponent } from '~/auth-mod/components/fill-data-form/fill-data-form.component';
import { FinishResetPasswordFormComponent } from '~/auth-mod/components/finish-reset-password-form/finish-reset-password-form.component';
import { FirstMfaSetupComponent } from '~/auth-mod/components/first-mfa-setup/first-mfa-setup.component';
import { FooterControlListComponent } from '~/auth-mod/components/footer-control-list/footer-control-list.component';
import { FooterControlsComponent } from '~/auth-mod/components/footer-controls/footer-controls.component';
import { FooterComponent } from '~/auth-mod/components/footer/footer.component';
import { LoginFormComponent } from '~/auth-mod/components/login-form/login-form.component';
import { LoginMyAccountModalComponent } from '~/auth-mod/components/login-my-account-modal/login-my-account-modal.component';
import { MfaCodeFormComponent } from '~/auth-mod/components/mfa-code-form/mfa-code-form.component';
import { MfaEmailFormComponent } from '~/auth-mod/components/mfa-email-form/mfa-email-form.component';
import { MySavedAccountsComponent } from '~/auth-mod/components/my-saved-accounts/my-saved-accounts.component';
import { Oauth2ButtonComponent } from '~/auth-mod/components/oauth2-button/oauth2-button.component';
import { PasswordInputTogglerComponent } from '~/auth-mod/components/password-input-toggler/password-input-toggler.component';
import { RegisterFirstStageFormComponent } from '~/auth-mod/components/register-first-stage-form/register-first-stage-form.component';
import { RegisterFormConsentsComponent } from '~/auth-mod/components/register-form-consents/register-form-consents.component';
import { RegisterFormComponent } from '~/auth-mod/components/register-form/register-form.component';
import { RegisterSecondStageFormComponent } from '~/auth-mod/components/register-second-stage-form/register-second-stage-form.component';
import { StartResetPasswordFormComponent } from '~/auth-mod/components/start-reset-password-form/start-reset-password-form.component';
import { AccountGuard } from '~/auth-mod/guards/activate-account/activate-account.guard';
import { MfaCodeGuard } from '~/auth-mod/guards/mfa-code/mfa-code.guard';
import { AuthActivateAccountPageComponent } from '~/auth-mod/pages/auth-activate-account-page/auth-activate-account-page.component';
import { AuthChangePasswordPageComponent } from '~/auth-mod/pages/auth-change-password-page/auth-change-password-page.component';
import { AuthFillDataPageComponent } from '~/auth-mod/pages/auth-fill-data-page/auth-fill-data-page.component';
import { AuthLoginPageComponent } from '~/auth-mod/pages/auth-login-page/auth-login-page.component';
import { AuthMfaEmailPageComponent } from '~/auth-mod/pages/auth-mfa-email-page/auth-mfa-email-page.component';
import { AuthMfaPageComponent } from '~/auth-mod/pages/auth-mfa-page/auth-mfa-page.component';
import { AuthMyAccountsPageComponent } from '~/auth-mod/pages/auth-my-accounts-page/auth-my-accounts-page.component';
import { AuthRegisterPageComponent } from '~/auth-mod/pages/auth-register-page/auth-register-page.component';
import { AuthResetPasswordPageComponent } from '~/auth-mod/pages/auth-reset-password-page/auth-reset-password-page.component';
import { authReduxStore } from '~/auth-mod/store/reducer';
import { AuthEffects } from '~/auth-mod/store/side-effects/auth-effects';
import { SharedModule } from '~/shared-mod/shared.module';

@NgModule({
  declarations: [
    ActivateAccountFormComponent,
    AddMyAccountModalComponent,
    AgreeTermsContentComponent,
    AuthActivateAccountPageComponent,
    AuthChangePasswordPageComponent,
    AuthContentWrapperComponent,
    AuthFillDataPageComponent,
    AuthFormHeaderComponent,
    AuthLoginPageComponent,
    AuthMfaEmailPageComponent,
    AuthMfaPageComponent,
    AuthMyAccountsPageComponent,
    AuthRegisterPageComponent,
    AuthResetPasswordPageComponent,
    AuthRootComponent,
    ChangePasswordFormComponent,
    FillDataFormComponent,
    FinishResetPasswordFormComponent,
    FirstMfaSetupComponent,
    FooterControlListComponent,
    FooterControlsComponent,
    FooterComponent,
    LoginFormComponent,
    LoginMyAccountModalComponent,
    MfaCodeFormComponent,
    MfaEmailFormComponent,
    MySavedAccountsComponent,
    Oauth2ButtonComponent,
    PasswordInputTogglerComponent,
    RegisterFirstStageFormComponent,
    RegisterFormConsentsComponent,
    RegisterFormComponent,
    RegisterSecondStageFormComponent,
    StartResetPasswordFormComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    EffectsModule.forFeature([AuthEffects]),
    FormsModule,
    NgOptimizedImage,
    NgxTippyModule,
    NgIconsModule.withIcons({
      arrowLeftIcon: BtsIcon.bootstrapArrowLeft,
      eyeIcon: BtsIcon.bootstrapEye,
      eyeSlashIcon: BtsIcon.bootstrapEyeSlash,
      outsideLinkIcon: BtsIcon.bootstrapArrowReturnLeft,
      selectArrowDownIcon: BtsIcon.bootstrapCaretDownFill,
      plusCircleIcon: BtsIcon.bootstrapPlusCircle,
      questionCircleIcon: BtsIcon.bootstrapQuestionCircle,
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
  providers: [AccountGuard, MfaCodeGuard],
})
export class AuthModule {}
