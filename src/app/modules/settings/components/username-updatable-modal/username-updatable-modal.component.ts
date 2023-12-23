/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UpdateAccountDetailsReqDto } from '~/settings-mod/model/update-account-details.model';
import { MyAccountSettingsService } from '~/settings-mod/services/my-account-settings/my-account-settings.service';
import { AccountValueForAnotherExistValidator } from '~/settings-mod/validators/account-value-for-another-exist.validator';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { composeToAsync } from '~/shared-mod/validators/compose-to-async';
import { regex } from '~/shared-mod/validators/regex.constant';
import { AbstractUpdatableModalProvider } from '../abstract-updatable-modal-provider';

@Component({
  selector: 'vsph-username-updatable-modal',
  templateUrl: './username-updatable-modal.component.html',
  providers: [PopulateFormGroupService],
})
export class UsernameUpdatableModalComponent
  extends AbstractUpdatableModalProvider
  implements OnInit, OnDestroy
{
  constructor(
    private readonly _myAccountSettingsService: MyAccountSettingsService,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _accountValueForAnotherExistValidator: AccountValueForAnotherExistValidator,
    private readonly _store: Store<SharedReducer>
  ) {
    super(_myAccountSettingsService);
  }

  ngOnInit(): void {
    this.wrapOnActive$('username').subscribe(details => {
      this.formGroup = new FormGroup({
        username: new FormControl(
          details?.username,
          null,
          Validators.composeAsync([
            composeToAsync(Validators.required),
            composeToAsync(Validators.minLength(3)),
            composeToAsync(Validators.pattern(regex.USERNAME)),
            this._accountValueForAnotherExistValidator.validate('username'),
          ])
        ),
      });
      this._populateFormGroupService.setField(this.formGroup);
      this.accountDetails = details;
    });
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitUsernameForm(): void {
    if (this.accountDetails) {
      const reqDto: UpdateAccountDetailsReqDto = {
        ...this._myAccountSettingsService.generateBaseReqObj(
          this.accountDetails
        ),
        username: this.formGroup?.get('username')?.value,
      };
      this.wrapAsObservable$(
        this._myAccountSettingsService.updateAccountDetails$(reqDto)
      ).subscribe({
        next: () =>
          this._store.dispatch(
            NgrxAction_SHA.__updateLoggedUserUsername({
              username: reqDto.username,
            })
          ),
      });
    }
  }
}
