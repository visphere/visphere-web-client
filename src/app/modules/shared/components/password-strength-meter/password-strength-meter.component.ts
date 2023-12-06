/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { PasswordStrengthMeterService } from '~/shared-mod/services/password-strength-meter/password-strength-meter.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-password-strength-meter',
  templateUrl: './password-strength-meter.component.html',
})
export class PasswordStrengthMeterComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  countOfSpaces = Array.from({ length: 6 });
  currentStrength = 0;
  formGroup!: FormGroup;

  @Input() tailwindClass = 'vsph-auth__password-strenght-meter__colors';
  @Input() tailwindBgClass = 'vsph-auth__password-strenght-meter__bg';
  @Input() formControlIdentifier = 'password';

  constructor(
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _passwordStrengthMeterService: PasswordStrengthMeterService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(this._populateFormGroupService.field$).subscribe(
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
