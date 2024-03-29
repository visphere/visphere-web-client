/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TranslationRow } from '~/shared-mod/types/translation.type';

@Pipe({ name: 'vsphDatetimeFormatter' })
export class DatetimeFormatterPipe implements PipeTransform {
  transform(
    dateStr: string | undefined,
    lang$: Observable<TranslationRow>
  ): Observable<string> {
    return lang$.pipe(
      map(({ lang }) => {
        if (!dateStr) {
          return '';
        }
        const parsedDate = new Date(dateStr);
        return parsedDate.toLocaleDateString(lang, {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: 'numeric',
          minute: '2-digit',
        });
      })
    );
  }
}
