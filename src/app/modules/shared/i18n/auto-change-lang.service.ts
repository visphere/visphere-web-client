/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auto-change-lang.service.ts
 *   Created at: 2023-08-06, 18:55:39
 *   Last updated at: 2023-08-11, 00:06:03
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

import { APP_INITIALIZER, Injectable } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class AutoChangeLangService {
  constructor(
    private readonly _router: Router,
    private readonly _translateService: TranslateService,
    private readonly _titleStrategy: TitleStrategy
  ) {}

  autoChangeLang(): void {
    this._translateService.onLangChange.subscribe(() =>
      this._titleStrategy.updateTitle(this._router.routerState.snapshot)
    );
  }
}

function autoChangeLangInitFactory(
  autoChangeLangService: AutoChangeLangService
): () => void {
  return () => autoChangeLangService.autoChangeLang();
}

export const i18nAutoChangerInitializer = {
  provide: APP_INITIALIZER,
  useFactory: autoChangeLangInitFactory,
  deps: [AutoChangeLangService],
  multi: true,
};
