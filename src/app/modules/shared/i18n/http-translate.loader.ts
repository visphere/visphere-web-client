/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { TranslateCompiler, TranslateLoader } from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { environment } from '~/env/environment';
import { AVAILABLE_TRANSLATIONS } from '~/shared-mod/types/translation.type';
import { MultiTranslateLoader } from './multi-translate.loader';

function httpTranslateLoader(http: HttpClient): MultiTranslateLoader {
  return new MultiTranslateLoader(http, [
    `${environment.contentDistributorBaseUrl}/static/i18n/client-common/`,
    `${environment.contentDistributorBaseUrl}/static/i18n/common/`,
    `${environment.contentDistributorBaseUrl}/static/i18n/web-client/`,
    `${environment.contentDistributorBaseUrl}/static/i18n/web-common/`,
  ]);
}

export const i18nConfig = {
  availableLanguages: AVAILABLE_TRANSLATIONS,
  loader: {
    provide: TranslateLoader,
    useFactory: httpTranslateLoader,
    deps: [HttpClient],
  },
  compiler: {
    provide: TranslateCompiler,
    useClass: TranslateMessageFormatCompiler,
  },
};
