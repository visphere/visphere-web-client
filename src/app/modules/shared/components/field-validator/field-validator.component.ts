/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: field-validator.component.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 20:59:49
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
