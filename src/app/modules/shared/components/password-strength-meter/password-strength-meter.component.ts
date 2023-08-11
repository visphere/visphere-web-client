/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: password-strength-meter.component.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 20:52:26
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
import { debounceTime, takeUntil } from 'rxjs';
import { PasswordStrengthMeterService } from '~/shared-mod/services/password-strength-meter/password-strength-meter.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'msph-password-strength-meter',
  templateUrl: './password-strength-meter.component.html',
})
export class PasswordStrengthMeterComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  countOfSpaces = Array.from({ length: 6 });
  currentStrength = 0;

  @Input() tailwindClass = 'msph_auth-password-strenght-meter-colors';
  @Input() tailwindBgClass = 'msph_auth-password-strenght-meter-bg';

  @Input() formGroup!: FormGroup;
  @Input() formControlIdentifier = 'password';

  constructor(
    private readonly _passwordStrengthMeterService: PasswordStrengthMeterService
  ) {
    super();
  }

  ngOnInit(): void {
    const passwordFormControl = this.formGroup.get(this.formControlIdentifier);
    if (passwordFormControl) {
      this.calcPasswordStrength(passwordFormControl.value);
    }
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  debounceCalcStrength(): void {
    const passwordFormControl = this.formGroup.get(this.formControlIdentifier);
    if (!passwordFormControl) return;
    passwordFormControl.valueChanges
      .pipe(takeUntil(this._subscriptionHook), debounceTime(300))
      .subscribe(password => this.calcPasswordStrength(password));
  }

  private calcPasswordStrength(password: string): void {
    if (!password) {
      this.currentStrength = 0;
    } else {
      this.currentStrength =
        this._passwordStrengthMeterService.calcPasswordStrength(password);
    }
  }
}
