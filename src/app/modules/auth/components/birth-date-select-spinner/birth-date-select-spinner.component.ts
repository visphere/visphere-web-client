/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TitleCasePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PopulateFormControlService } from '~/shared-mod/context/populate-form-control/populate-form-control.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { TimeUtilsService } from '~/shared-mod/services/time-utils/time-utils.service';
import { DateComponentsType } from '~/shared-mod/types/date-components.type';
import { SpinnerListElementType } from '~/shared-mod/types/spinner-list-element.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-birth-date-select-spinner',
  templateUrl: './birth-date-select-spinner.component.html',
  providers: [TitleCasePipe, PopulateFormControlService],
})
export class BirthDateSelectSpinnerComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() i18nPrefix = 'webClient.registerPage';

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
    this._populateFormControlervice.setFields('birthDate', this.i18nPrefix);
    this.wrapAsObservable$(this._populateFormGroupService.field$).subscribe(
      formGroup => (this.formGroup = formGroup)
    );
    this.wrapAsObservable$(this._translateService.onLangChange).subscribe(
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
