/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: birth-date-select-spinner.component.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 20:59:26
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
import { TitleCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PopulateFormControlService } from '~/shared-mod/context/populate-form-control/populate-form-control.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { TimeUtilsService } from '~/shared-mod/services/time-utils/time-utils.service';
import { DateComponentsType } from '~/shared-mod/types/date-components.type';
import { SpinnerListElementType } from '~/shared-mod/types/spinner-list-element.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'msph-birth-date-select-spinner',
  templateUrl: './birth-date-select-spinner.component.html',
  providers: [TitleCasePipe, PopulateFormControlService],
})
export class BirthDateSelectSpinnerComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  formGroup!: FormGroup;

  formMonths = this.generateAndConvertMonths();
  formDays = this._timeUtilService.generateDaysForSingleMonth();
  formYears = this._timeUtilService.generateYearsForBirthdayForm();

  constructor(
    private readonly _titleCasePipe: TitleCasePipe,
    private readonly _timeUtilService: TimeUtilsService,
    private readonly _translateService: TranslateService,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _populateFormControlervice: PopulateFormControlService
  ) {
    super();
  }

  ngOnInit(): void {
    this._populateFormControlervice.setFields(
      'birthDate',
      'webClient.register'
    );
    this.wrapAsObservable(this._populateFormGroupService.field$).subscribe(
      formGroup => (this.formGroup = formGroup)
    );
    this.wrapAsObservable(this._translateService.onLangChange).subscribe(
      ({ lang }) => (this.formMonths = this.generateAndConvertMonths(lang))
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  patchValue(patchingData: SpinnerListElementType | null, key: string): void {
    const value = patchingData ? patchingData.id : null;
    const control = this.formGroup.get('birthDate');
    if (!control) return;

    control.patchValue({ ...control.value, [key]: value });
    control.markAsDirty();
  }

  getFormControlValue(key: keyof DateComponentsType): number | null {
    const control = this.formGroup.get('birthDate');
    if (control && control.value[key]) {
      return control.value[key];
    }
    return null;
  }

  private generateAndConvertMonths(
    lang = this._translateService.currentLang
  ): SpinnerListElementType[] {
    return this._timeUtilService
      .generateMonthsForDifferentLocale(lang)
      .map(v => ({ ...v, value: this._titleCasePipe.transform(v.value) }));
  }
}
