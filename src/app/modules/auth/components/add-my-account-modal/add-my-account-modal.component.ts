/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyAccountsService } from '~/auth-mod/services/my-accounts/my-accounts.service';
import { MyAcccountUserAlreadyExistValidator } from '~/auth-mod/validators/my-account-user-already-exist.validator';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';
import { composeToAsync } from '~/shared-mod/validators/compose-to-async';

@Component({
  selector: 'vsph-add-my-account-modal',
  templateUrl: './add-my-account-modal.component.html',
  providers: [PopulateFormGroupService],
})
export class AddMyAccountModalComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  isLoading$ = this._myAccountsService.isLoading$;
  isOpen$ = this._myAccountsService.addNewModalIsOpen$;

  addMyAccountForm: FormGroup;

  constructor(
    private readonly _myAccountsService: MyAccountsService,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _myAcccountUserAlreadyExistValidator: MyAcccountUserAlreadyExistValidator
  ) {
    super();
    this.addMyAccountForm = new FormGroup({
      usernameOrEmailAddress: new FormControl(
        '',
        Validators.composeAsync([
          composeToAsync(Validators.required),
          this._myAcccountUserAlreadyExistValidator.validate(),
        ])
      ),
    });
    this._myAccountsService.setReactiveForm(this.addMyAccountForm);
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.addMyAccountForm);
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleEmitOnClose(): void {
    this.addMyAccountForm.reset();
    this._myAccountsService.changeAddNewModalVisibility(false);
  }

  handleAddNewAccount(): void {
    this.wrapAsObservable$(this._myAccountsService.submitForm$()).subscribe({
      next: () => this.handleEmitOnClose(),
    });
  }
}
