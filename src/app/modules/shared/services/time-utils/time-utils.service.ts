/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { DateComponentsType } from '~/shared-mod/types/date-components.type';
import { SpinnerListElementType } from '~/shared-mod/types/spinner-list-element.type';
import { regex } from '~/shared-mod/validators/regex.constant';
import { LanguageSwitcherService } from '../language-switcher/language-switcher.service';

@Injectable({ providedIn: 'root' })
export class TimeUtilsService {
  private _currentLang = '';

  constructor(
    private readonly _languageSwitcherService: LanguageSwitcherService
  ) {
    this._languageSwitcherService.selectedLang$.subscribe(
      ({ lang }) => (this._currentLang = lang)
    );
  }

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

  formatDateToLocaleShortForm(dateStr: string): string {
    if (!regex.DATE_VALID.test(dateStr)) {
      return '';
    }
    const splittedDate = dateStr.split('-');
    if (splittedDate.length !== 3 || !this._currentLang) {
      return '';
    }
    const [year, month, day] = splittedDate;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString(this._currentLang, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  }

  revertStandardDateToSlash(dateStr: string): string {
    const date = moment(new Date(dateStr));
    return date.format('DD/MM/YYYY');
  }

  decomposeDate(dateStr?: string): number[] {
    if (dateStr) {
      const date = moment(new Date(dateStr));
      return [date.daysInMonth(), date.month(), date.year()];
    }
    return [1, 1, 1970];
  }

  composeToDate({ day, month, year }: DateComponentsType): string {
    const date = moment(new Date(year, month - 1, day));
    return date.format('DD/MM/YYYY');
  }
}
