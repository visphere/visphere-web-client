/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auth-checkbox-form-input.component.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 20:58:15
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
import { combineLatest } from 'rxjs';
import { PopulateFormControlService } from '~/shared-mod/context/populate-form-control/populate-form-control.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'msph-auth-checkbox-form-input',
  templateUrl: './auth-checkbox-form-input.component.html',
  providers: [PopulateFormControlService],
})
export class AuthCheckboxFormInputComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() i18nPrefix!: string;
  @Input() formControlIdentifier!: string;

  formGroup!: FormGroup;

  constructor(
    private readonly _formHelperService: FormHelperService,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _populateFormControlService: PopulateFormControlService
  ) {
    super();
  }

  ngOnInit(): void {
    this._populateFormControlService.setFields(
      this.formControlIdentifier,
      this.i18nPrefix
    );
    this.wrapAsObservable(
      combineLatest([
        this._populateFormGroupService.field$,
        this._populateFormGroupService.formDisabled$,
      ])
    ).subscribe(([formGroup, formDisabled]) => {
      this.formGroup = formGroup;
      this._formHelperService.toggleFormField(
        formGroup,
        this.formControlIdentifier,
        formDisabled
      );
    });
  }
  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSetDirtyAndTouched(): void {
    const control = this.formGroup.get(this.formControlIdentifier);
    control?.markAsDirty();
    control?.markAsTouched();
  }
}
