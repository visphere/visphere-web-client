/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: http-translate.loader.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 01:46:29
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This is a project
 * completing a engineers degree in computer science at Silesian University of Technology.
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
