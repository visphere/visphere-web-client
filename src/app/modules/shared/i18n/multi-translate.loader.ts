/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, forkJoin, map } from 'rxjs';

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
