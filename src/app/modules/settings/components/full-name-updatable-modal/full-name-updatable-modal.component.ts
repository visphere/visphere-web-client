/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UpdateAccountDetailsReqDto } from '~/settings-mod/model/update-account-details.model';
import { MyAccountSettingsService } from '~/settings-mod/services/my-account-settings/my-account-settings.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractUpdatableModalProvider } from '../abstract-updatable-modal-provider';

@Component({
  selector: 'vsph-full-name-updatable-modal',
  templateUrl: './full-name-updatable-modal.component.html',
  providers: [PopulateFormGroupService],
})
export class FullNameUpdatableModalComponent
  extends AbstractUpdatableModalProvider
  implements OnInit, OnDestroy
{
  constructor(
    private readonly _myAccountSettingsService: MyAccountSettingsService,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _store: Store<SharedReducer>
  ) {
    super(_myAccountSettingsService);
  }

  ngOnInit(): void {
    this.wrapOnActive$('full-name').subscribe(details => {
      this.formGroup = new FormGroup({
        firstName: new FormControl(details?.firstName, [
          Validators.required,
          Validators.minLength(2),
        ]),
        lastName: new FormControl(details?.lastName, [
          Validators.required,
          Validators.minLength(2),
        ]),
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

  handleSubmitFullNameForm(): void {
    if (this.accountDetails) {
      const reqDto: UpdateAccountDetailsReqDto = {
        ...this._myAccountSettingsService.generateBaseReqObj(
          this.accountDetails
        ),
        firstName: this.formGroup?.get('firstName')?.value,
        lastName: this.formGroup?.get('lastName')?.value,
      };
      this.wrapAsObservable$(
        this._myAccountSettingsService.updateAccountDetails$(reqDto)
      ).subscribe({
        next: () =>
          this._store.dispatch(
            NgrxAction_SHA.__updateLoggedUserFullName({
              fullName: `${reqDto.firstName} ${reqDto.lastName}`,
            })
          ),
      });
    }
  }

  get contentsAreIdentical(): boolean {
    return (
      this.checkIfContentsAreIdentical('firstName') &&
      this.checkIfContentsAreIdentical('lastName')
    );
  }
}
