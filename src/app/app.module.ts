/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: app.module.ts
 *   Created at: 2023-08-06, 18:55:39
 *   Last updated at: 2023-08-11, 20:51:56
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
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppRootComponent } from '~/root-mod/app-root.component';
import { AppRoutingModule } from '~/root-mod/app-routing.module';
import { titleStrategyProvider } from '~/shared-mod/config/template-page-title.strategy';
import { i18nAutoChangerInitializer } from '~/shared-mod/i18n/auto-change-lang.service';
import { i18nConfig } from '~/shared-mod/i18n/http-translate.loader';
import { appendLangInterceptorInitializer } from '~/shared-mod/interceptors/append-lang-header/append-lang-header.interceptor';
import { languageSwitcherInitializer } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { lazyPageLoaderInitializer } from '~/shared-mod/services/lazy-page-loader/lazy-page-loader.service';
import { passwordStrengthMeterInitializer } from '~/shared-mod/services/password-strength-meter/password-strength-meter.service';
import { themeSwitcherInitializer } from '~/shared-mod/services/theme-switcher/theme-switcher.service';
import { SharedModule } from '~/shared-mod/shared.module';
import buildSpecifics from '../environments/build-specifics';

@NgModule({
  declarations: [AppRootComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(i18nConfig),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ...buildSpecifics,
  ],
  providers: [
    titleStrategyProvider,
    i18nAutoChangerInitializer,
    languageSwitcherInitializer,
    themeSwitcherInitializer,
    passwordStrengthMeterInitializer,
    lazyPageLoaderInitializer,
    appendLangInterceptorInitializer,
  ],
  bootstrap: [AppRootComponent],
})
export class AppModule {}
