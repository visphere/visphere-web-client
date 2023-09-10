/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PopulateFormControlService } from '~/shared-mod/context/populate-form-control/populate-form-control.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'msph-field-validator',
  template: `
    <div *ngIf="checkError()">
      {{
        'msph.' +
          i18nPrefix +
          'Page.formFields.' +
          formControlName +
          '.errors.' +
          type | translate
      }}
    </div>
  `,
})
export class FieldValidatorComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() type = 'required';

  formGroup!: FormGroup;
  formControlName = '';
  i18nPrefix = '';

  constructor(
    private readonly _formHelperService: FormHelperService,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _populateFormControlService: PopulateFormControlService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable(this._populateFormGroupService.field$).subscribe(
      formGroup => (this.formGroup = formGroup)
    );
    this.wrapAsObservable(this._populateFormControlService.fields$).subscribe(
      ([formControlName, i18nPrefix]) => {
        this.formControlName = formControlName;
        this.i18nPrefix = i18nPrefix;
      }
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  checkError(): boolean {
    return this._formHelperService.checkError(
      this.formGroup,
      this.formControlName,
      this.type
    );
  }
}
