/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { regex } from '~/shared-mod/validators/regex.constant';
import { LanguageSwitcherService } from '../language-switcher/language-switcher.service';

@Injectable({ providedIn: 'root' })
export class FormatHelperService {
  private _currentLang = '';

  constructor(
    private readonly _languageSwitcherService: LanguageSwitcherService
  ) {
    this._languageSwitcherService.selectedLang$.subscribe(
      ({ lang }) => (this._currentLang = lang)
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
}
