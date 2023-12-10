/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as BtsIcon from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { CdTimerModule } from 'angular-cd-timer';
import { NgxRerenderModule } from 'ngx-rerender';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { BirthDateSelectSpinnerComponent } from '~/shared-mod/components/birth-date-select-spinner/birth-date-select-spinner.component';
import { CheckboxFormInputComponent } from '~/shared-mod/components/checkbox-form-input/checkbox-form-input.component';
import { CommonFormInputComponent } from '~/shared-mod/components/common-form-input/common-form-input.component';
import { ConditionalTooltipWrapperComponent } from '~/shared-mod/components/conditional-wrapper/conditional-tooltip-wrapper.component';
import { DeferredButtonComponent } from '~/shared-mod/components/deferred-button/deferred-button.component';
import { DevastateActionModalComponent } from '~/shared-mod/components/devastate-action-modal/devastate-action-modal.component';
import { FieldValidatorComponent } from '~/shared-mod/components/field-validator/field-validator.component';
import { LazyButtonSpinnerComponent } from '~/shared-mod/components/lazy-button-spinner/lazy-button-spinner.component';
import { LazyPageLoaderComponent } from '~/shared-mod/components/lazy-page-loader/lazy-page-loader.component';
import { LogoutModalComponent } from '~/shared-mod/components/logout-modal/logout-modal.component';
import { ModalWrapperComponent } from '~/shared-mod/components/modal-wrapper/modal-wrapper.component';
import { PasswordInputTogglerComponent } from '~/shared-mod/components/password-input-toggler/password-input-toggler.component';
import { PasswordStrengthMeterComponent } from '~/shared-mod/components/password-strength-meter/password-strength-meter.component';
import { SingleSelectSpinnerComponent } from '~/shared-mod/components/single-select-spinner/single-select-spinner.component';
import { SnackbarsContainerComponent } from '~/shared-mod/components/snackbars-container/snackbars-container.component';
import { SocialsHorizontalComponent } from '~/shared-mod/components/socials-horizontal/socials-horizontal.component';
import { VerifyCaptchaModalComponent } from '~/shared-mod/components/verify-captcha-modal/verify-captcha-modal.component';
import { NotFoundPageComponent } from '~/shared-mod/pages/not-found-page/not-found-page.component';
import { DateFormatterPipe } from '~/shared-mod/pipes/date-formatter/date-formatter.pipe';
import { SanitizePipe } from '~/shared-mod/pipes/sanitize/sanitize.pipe';
import { sharedReduxStore } from '~/shared-mod/store/reducer';
import { SharedEffects } from '~/shared-mod/store/side-effects/shared-effects';

@NgModule({
  declarations: [
    BirthDateSelectSpinnerComponent,
    CheckboxFormInputComponent,
    CommonFormInputComponent,
    ConditionalTooltipWrapperComponent,
    DateFormatterPipe,
    DeferredButtonComponent,
    DevastateActionModalComponent,
    FieldValidatorComponent,
    LazyButtonSpinnerComponent,
    LazyPageLoaderComponent,
    LogoutModalComponent,
    ModalWrapperComponent,
    NotFoundPageComponent,
    PasswordInputTogglerComponent,
    PasswordStrengthMeterComponent,
    SanitizePipe,
    SingleSelectSpinnerComponent,
    SocialsHorizontalComponent,
    SnackbarsContainerComponent,
    VerifyCaptchaModalComponent,
  ],
  imports: [
    CdTimerModule,
    CommonModule,
    EffectsModule.forFeature([SharedEffects]),
    TranslateModule,
    NgIconsModule.withIcons({
      arrowLeftIcon: BtsIcon.bootstrapArrowLeft,
      darkModeIcon: BtsIcon.bootstrapMoonStarsFill,
      eyeIcon: BtsIcon.bootstrapEye,
      eyeSlashIcon: BtsIcon.bootstrapEyeSlash,
      lightModeIcon: BtsIcon.bootstrapSunFill,
      selectArrowDownIcon: BtsIcon.bootstrapCaretDownFill,
      systemModeIcon: BtsIcon.bootstrapCircleHalf,
      xIcon: BtsIcon.bootstrapXLg,
    }),
    NgxRerenderModule,
    NgxTippyModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature(
      sharedReduxStore.reducerName,
      sharedReduxStore.reducerFunction
    ),
  ],
  exports: [
    BirthDateSelectSpinnerComponent,
    CheckboxFormInputComponent,
    CommonFormInputComponent,
    ConditionalTooltipWrapperComponent,
    DateFormatterPipe,
    DeferredButtonComponent,
    DevastateActionModalComponent,
    FieldValidatorComponent,
    LazyPageLoaderComponent,
    LazyButtonSpinnerComponent,
    LogoutModalComponent,
    ModalWrapperComponent,
    PasswordInputTogglerComponent,
    PasswordStrengthMeterComponent,
    SanitizePipe,
    SocialsHorizontalComponent,
    SnackbarsContainerComponent,
    VerifyCaptchaModalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
