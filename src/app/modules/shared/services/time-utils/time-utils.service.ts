/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: time-utils.service.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 20:54:28
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
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
}
