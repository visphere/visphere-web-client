/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
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
  @Input() formControlIdentifier = 'password';
  formGroup!: FormGroup;

  constructor(
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _passwordStrengthMeterService: PasswordStrengthMeterService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable(this._populateFormGroupService.field$).subscribe(
      formGroup => {
        this.formGroup = formGroup;
        const passwordFormControl = formGroup.get(this.formControlIdentifier);
        if (passwordFormControl) {
          this.calcPasswordStrength(passwordFormControl.value);
        }
      }
    );
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
