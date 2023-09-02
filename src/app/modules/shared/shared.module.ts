/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: shared.module.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 20:55:36
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
    FieldValidatorComponent,
    LazyPageLoaderComponent,
    LazyButtonSpinnerComponent,
    PasswordStrengthMeterComponent,
    SanitizePipe,
    SnackbarsContainerComponent,
    VerifyCaptchaModalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
