/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateAccountPasswordReqDto } from '~/settings-mod/model/update-account-password.model';
import { MyAccountSettingsService } from '~/settings-mod/services/my-account-settings/my-account-settings.service';
import { PasswordStrengthMeterComponent } from '~/shared-mod/components/password-strength-meter/password-strength-meter.component';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { passwordMatchValidator } from '~/shared-mod/validators/password-match.validator';
import { regex } from '~/shared-mod/validators/regex.constant';
import { AbstractUpdatableModalProvider } from '../abstract-updatable-modal-provider';

@Component({
  selector: 'vsph-password-updatable-modal',
  templateUrl: './password-updatable-modal.component.html',
  providers: [PopulateFormGroupService],
})
export class PasswordUpdatableModalComponent
  extends AbstractUpdatableModalProvider
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('meter') strengthMeter!: PasswordStrengthMeterComponent;

  constructor(
    private readonly _myAccountSettingsService: MyAccountSettingsService,
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    super(_myAccountSettingsService);
    this.formGroup = new FormGroup(
      {
        oldPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(regex.PASSWORD),
        ]),
        confirmedNewPassword: new FormControl('', [Validators.required]),
        logoutFromAll: new FormControl(false),
      },
      {
        validators: passwordMatchValidator(
          'newPassword',
          'confirmedNewPassword'
        ),
      }
    );
  }

  ngAfterViewInit(): void {
    this.strengthMeter?.debounceCalcStrength();
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.formGroup!);
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitChangePasswordForm(): void {
    const reqDto: UpdateAccountPasswordReqDto = this.formGroup!.getRawValue();
    this.wrapAsObservable$(
      this._myAccountSettingsService.updateAccountPassword$(reqDto)
    ).subscribe();
  }
}
