/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import * as BtsIcon from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { CdTimerModule } from 'angular-cd-timer';
import { NgxRerenderModule } from 'ngx-rerender';
import { SharedEffects } from '~/root-mod/modules/shared/store/side-effects/shared-effects';
import { DeferredButtonComponent } from '~/shared-mod/components/deferred-button/deferred-button.component';
import { DevastateActionModalComponent } from '~/shared-mod/components/devastate-action-modal/devastate-action-modal.component';
import { FieldValidatorComponent } from '~/shared-mod/components/field-validator/field-validator.component';
import { ModalWrapperComponent } from '~/shared-mod/components/modal-wrapper/modal-wrapper.component';
import { PasswordStrengthMeterComponent } from '~/shared-mod/components/password-strength-meter/password-strength-meter.component';
import { SnackbarsContainerComponent } from '~/shared-mod/components/snackbars-container/snackbars-container.component';
import { VerifyCaptchaModalComponent } from '~/shared-mod/components/verify-captcha-modal/verify-captcha-modal.component';
import { NotFoundPageComponent } from '~/shared-mod/pages/not-found-page/not-found-page.component';
import { SanitizePipe } from '~/shared-mod/pipes/sanitize/sanitize.pipe';
import { sharedReduxStore } from '~/shared-mod/store/reducer';
import { IzomorphicLoaderComponent } from './components/izomorphic-loader/izomorphic-loader.component';
import { LazyButtonSpinnerComponent } from './components/lazy-button-spinner/lazy-button-spinner.component';
import { LazyPageLoaderComponent } from './components/lazy-page-loader/lazy-page-loader.component';

@NgModule({
  declarations: [
    DeferredButtonComponent,
    DevastateActionModalComponent,
    FieldValidatorComponent,
    IzomorphicLoaderComponent,
    LazyButtonSpinnerComponent,
    LazyPageLoaderComponent,
    ModalWrapperComponent,
    NotFoundPageComponent,
    PasswordStrengthMeterComponent,
    SanitizePipe,
    SnackbarsContainerComponent,
    VerifyCaptchaModalComponent,
  ],
  imports: [
    CdTimerModule,
    CommonModule,
    EffectsModule.forFeature([SharedEffects]),
    TranslateModule,
    NgIconsModule.withIcons({
      xIcon: BtsIcon.bootstrapXLg,
    }),
    NgxRerenderModule,
    StoreModule.forFeature(
      sharedReduxStore.reducerName,
      sharedReduxStore.reducerFunction
    ),
  ],
  exports: [
    DeferredButtonComponent,
    DevastateActionModalComponent,
    FieldValidatorComponent,
    LazyPageLoaderComponent,
    LazyButtonSpinnerComponent,
    ModalWrapperComponent,
    PasswordStrengthMeterComponent,
    SanitizePipe,
    SnackbarsContainerComponent,
    VerifyCaptchaModalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
