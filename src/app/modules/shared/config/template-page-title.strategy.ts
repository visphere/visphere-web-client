/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
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
