/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: template-page-title.strategy.ts
 *   Created at: 2023-08-06, 18:55:39
 *   Last updated at: 2023-08-11, 00:05:44
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

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
  private readonly DEF_SUFFIX = 'MoonSphere';
  private readonly SEPARATOR = '|';

  constructor(
    private readonly _title: Title,
    private readonly _translateService: TranslateService
  ) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot) {
    const titlePlaceholder = this.buildTitle(snapshot);
    if (titlePlaceholder !== undefined) {
      const title = this._translateService.instant(
        `msph.webClient.pageTitle.${titlePlaceholder}`
      );
      this._title.setTitle(`${title} ${this.SEPARATOR} ${this.DEF_SUFFIX}`);
    } else {
      this._title.setTitle(this.DEF_SUFFIX);
    }
  }
}

export const titleStrategyProvider = {
  provide: TitleStrategy,
  useClass: TemplatePageTitleStrategy,
};
