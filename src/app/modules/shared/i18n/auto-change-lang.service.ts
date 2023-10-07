/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
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
