/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
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
import { accessRefreshInterceptorInitializer } from '~/shared-mod/interceptors/access-refresh/access-refresh.interceptor';
import { appendLangInterceptorInitializer } from '~/shared-mod/interceptors/append-lang-header/append-lang-header.interceptor';
import { globalExceptionHandlerInterceptorInitializer } from '~/shared-mod/interceptors/global-exception-handler/global-exception-handler.interceptor';
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
    globalExceptionHandlerInterceptorInitializer,
    accessRefreshInterceptorInitializer,
  ],
  bootstrap: [AppRootComponent],
})
export class AppModule {}
