/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Observable, map } from 'rxjs';
import { TranslationRow } from '~/shared-mod/types/translation.type';
import { regex } from '~/shared-mod/validators/regex.constant';

@Pipe({ name: 'vsphDateFormatter' })
export class DateFormatterPipe implements PipeTransform {
  transform(
    dateStr: string | undefined,
    lang$: Observable<TranslationRow>
  ): Observable<string> {
    return lang$.pipe(
      map(({ lang }) => {
        if (!dateStr) {
          return '';
        }
        if (!regex.DATE_VALID.test(dateStr)) {
          return dateStr;
        }
        const splittedDate = dateStr.split('-');
        if (splittedDate.length !== 3 || !lang) {
          return dateStr;
        }
        const [year, month, day] = splittedDate.map(Number);
        const date = moment(`${year}-${month}-${day}`, 'YYYY-M-D');
        return date.toDate().toLocaleDateString(lang, {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        });
      })
    );
  }
}
