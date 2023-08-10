/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 * Silesian University of Technology
 *
 *    File name: multi-translate.loader.ts
 *    Last modified: 7/4/23, 8:15 PM
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

import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

import { forkJoin, map, Observable } from 'rxjs';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class MultiTranslateLoader implements TranslateLoader {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _translations: string[]
  ) {}

  getTranslation(lang: string): Observable<object> {
    const requests = this._translations.map(translation =>
      this._httpClient.get(`${translation}${lang}.json`)
    );
    return forkJoin(requests).pipe(
      map(res =>
        res.reduce(
          (combinedTranslations, translation) => ({
            ...combinedTranslations,
            ...translation,
          }),
          {}
        )
      )
    );
  }
}
