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
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SanitizePipe } from '~/shared-mod/pipes/sanitize/sanitize.pipe';
import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';

@Component({
  selector: 'msph-password-input-toggler',
  templateUrl: './password-input-toggler.component.html',
  providers: [SanitizePipe],
})
export class PasswordInputTogglerComponent {
  @Input() formGroup!: FormGroup;
  @Input() formControlIdentifier!: string;
  @Input() maxLength = 80;
  @Input() placeholder = '';
  @Input() i18nLabel!: string;
  @Input() requiredStar = false;

  isVisible = false;
  capsLockIsOn = false;

  constructor(private readonly _formHelperService: FormHelperService) {}

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
