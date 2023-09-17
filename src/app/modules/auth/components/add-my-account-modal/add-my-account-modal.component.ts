/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MyAccountsService } from '~/auth-mod/services/my-accounts/my-accounts.service';
import { MyAcccountUserAlreadyExistValidator } from '~/auth-mod/validators/my-account-user-already-exist.validator';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'msph-add-my-account-modal',
  templateUrl: './add-my-account-modal.component.html',
  providers: [PopulateFormGroupService, MyAcccountUserAlreadyExistValidator],
})
export class AddMyAccountModalComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  isLoading$: Observable<boolean> = this._myAccountsService.isLoading$;
  isOpen$: Observable<boolean> = this._myAccountsService.addNewModalIsOpen$;

  addMyAccountForm: FormGroup;

  constructor(
    private readonly _myAccountsService: MyAccountsService,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _myAcccountUserAlreadyExistValidator: MyAcccountUserAlreadyExistValidator
  ) {
    super();
    this.addMyAccountForm = new FormGroup({
      usernameOrEmailAddress: new FormControl('', [
        Validators.required,
        this._myAcccountUserAlreadyExistValidator.validate(),
      ]),
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
    this.wrapAsObservable(this._myAccountsService.submitForm()).subscribe({
      next: () => this.handleEmitOnClose(),
    });
  }
}