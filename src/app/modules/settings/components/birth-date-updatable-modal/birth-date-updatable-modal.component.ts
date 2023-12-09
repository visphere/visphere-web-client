/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UpdateAccountDetailsReqDto } from '~/settings-mod/model/update-account-details.model';
import { MyAccountSettingsService } from '~/settings-mod/services/my-account-settings/my-account-settings.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { TimeUtilsService } from '~/shared-mod/services/time-utils/time-utils.service';
import { DateComponentsType } from '~/shared-mod/types/date-components.type';
import { BirthDateValidator } from '~/shared-mod/validators/birth-date.validator';
import { AbstractUpdatableModalProvider } from '../abstract-updatable-modal-provider';

@Component({
  selector: 'vsph-birth-date-updatable-modal',
  templateUrl: './birth-date-updatable-modal.component.html',
  providers: [PopulateFormGroupService],
})
export class BirthDateUpdatableModalComponent
  extends AbstractUpdatableModalProvider
  implements OnInit, OnDestroy
{
  constructor(
    private readonly _myAccountSettingsService: MyAccountSettingsService,
    private readonly _birthDateValidator: BirthDateValidator,
    private readonly _timeUtilsService: TimeUtilsService,
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    super(_myAccountSettingsService);
  }

  ngOnInit(): void {
    this.wrapOnActive$('birth-date').subscribe(details => {
      if (details) {
        this.formGroup = new FormGroup({
          birthDate: new FormControl(
            this._timeUtilsService.decomposeDate(details?.birthDate),
            this._birthDateValidator.validate()
          ),
        });
        this.accountDetails = details;
        this._populateFormGroupService.setField(this.formGroup);
      }
    });
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitBirthDateForm(): void {
    if (this.accountDetails) {
      const reqDto: UpdateAccountDetailsReqDto = {
        ...this._myAccountSettingsService.generateBaseReqObj(
          this.accountDetails
        ),
        birthDate: this._timeUtilsService.composeSlashDate(
          this.formGroup?.get('birthDate')?.value as DateComponentsType
        ),
      };
      this.wrapAsObservable$(
        this._myAccountSettingsService.updateAccountDetails$(reqDto)
      ).subscribe();
    }
  }

  get contentsAreIdentical(): boolean {
    if (this.accountDetails) {
      return this._timeUtilsService.compareTwoDates(
        this.formGroup?.get('birthDate')?.value as DateComponentsType,
        this._timeUtilsService.decomposeDate(this.accountDetails?.birthDate)
      );
    }
    return true;
  }
}
