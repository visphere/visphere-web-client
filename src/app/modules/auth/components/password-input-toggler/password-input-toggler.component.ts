/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: password-input-toggler.component.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 21:01:04
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
import { takeUntil } from 'rxjs';
import { PopulateFormControlService } from '~/shared-mod/context/populate-form-control/populate-form-control.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { SanitizePipe } from '~/shared-mod/pipes/sanitize/sanitize.pipe';
import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'msph-password-input-toggler',
  templateUrl: './password-input-toggler.component.html',
  providers: [SanitizePipe, PopulateFormControlService],
})
export class PasswordInputTogglerComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() formControlIdentifier!: string;
  @Input() maxLength = 80;
  @Input() placeholder = '';
  @Input() i18nPrefix!: string;
  @Input() requiredStar = false;

  formGroup!: FormGroup;
  i18nLabel = '';
  isVisible = false;
  capsLockIsOn = false;

  constructor(
    private readonly _formHelperService: FormHelperService,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _populateFormControlService: PopulateFormControlService
  ) {
    super();
  }

  ngOnInit(): void {
    this.i18nLabel = `msph.${this.i18nPrefix}Page.formFields.${this.formControlIdentifier}.value`;
    this._populateFormControlService.setFields(
      this.formControlIdentifier,
      this.i18nPrefix
    );
    this._populateFormGroupService.field$
      .pipe(takeUntil(this._subscriptionHook))
      .subscribe(formGroup => (this.formGroup = formGroup));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  onChangeVisibility(inputData: string): void {
    if (inputData === '') return;
    this.isVisible = !this.isVisible;
  }

  onChangeInputData(inputData: string): void {
    if (inputData !== '') return;
    this.isVisible = false;
  }

  checkCapsLock(event: KeyboardEvent): void {
    this.capsLockIsOn = event.getModifierState('CapsLock');
  }

  isFieldInvalid(): boolean {
    return this._formHelperService.validateField(
      this.formGroup,
      this.formControlIdentifier
    );
  }
}
