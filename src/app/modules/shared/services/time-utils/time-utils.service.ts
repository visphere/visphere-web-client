/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { DateComponentsType } from '~/shared-mod/types/date-components.type';
import { SpinnerListElementType } from '~/shared-mod/types/spinner-list-element.type';

@Injectable({ providedIn: 'root' })
export class TimeUtilsService {
  generateMonthsForDifferentLocale(lang: string): SpinnerListElementType[] {
    moment.locale(lang);
    return moment.months().map((value, idx) => ({ id: idx + 1, value }));
  }

  generateDaysForSingleMonth(): SpinnerListElementType[] {
    return Array.from({ length: 31 }, (_, idx) => idx + 1).map(value => ({
      id: value,
      value: String(value),
    }));
  }

  generateYearsForBirthdayForm(): SpinnerListElementType[] {
    const maxYear = new Date().getFullYear() - 3;
    const minYear = 1900;
    return Array.from({ length: maxYear - minYear }, (_, idx) => minYear + idx)
      .sort((x, y) => y - x)
      .map(value => ({ id: value, value: String(value) }));
  }

  checkIfDateIsValid({ day, month, year }: DateComponentsType): boolean {
    const parsedDate = moment(`${year}-${month}-${day}`, 'YYYY-M-D');
    return parsedDate.isValid();
  }

  checkIfUserHas13YearsOld({ day, month, year }: DateComponentsType): boolean {
    const userBirthdate = moment(`${year}-${month}-${day}`, 'YYYY-M-D');
    return (
      userBirthdate.isValid() &&
      userBirthdate.add(13, 'years').isBefore(moment())
    );
  }

  composeSlashDate({ day, month, year }: DateComponentsType): string {
    const date = moment(`${year}-${month}-${day}`, 'YYYY-M-D');
    return date.format('DD/MM/YYYY');
  }

  composeSlashDateStr(dateStr?: string): string {
    const { year, month, day } = this.decomposeDate(dateStr);
    const date = moment(`${year}-${month}-${day}`, 'YYYY-M-D');
    return date.format('DD/MM/YYYY');
  }

  decomposeDate(dateStr?: string): DateComponentsType {
    if (dateStr) {
      const [year, month, day] = dateStr.split('-').map(Number);
      return { day, month, year };
    }
    return { day: 1, month: 1, year: 1970 };
  }

  compareTwoDates(
    dateF: DateComponentsType,
    dateS: DateComponentsType
  ): boolean {
    const first = moment(
      `${dateF.year}-${dateF.month}-${dateF.day}`,
      'YYYY-M-D'
    );
    const second = moment(
      `${dateS.year}-${dateS.month}-${dateS.day}`,
      'YYYY-M-D'
    );
    return first.isSame(second);
  }
}
