/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { MySavedAccountModel } from '~/auth-mod/models/my-saved-account.model';
import { MyAccountsService } from '~/auth-mod/services/my-accounts/my-accounts.service';
import * as NgrxSelector_ATH from '~/auth-mod/store/selectors';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { environment } from '~/env/environment';

@Component({
  selector: 'vsph-my-saved-accounts',
  templateUrl: './my-saved-accounts.component.html',
})
export class MySavedAccountsComponent {
  isRemoveModalOpen$ = this._myAccountsService.removeModalIsOpen$;
  fetchingState$ = this._myAccountsService.fetchingState$;

  mySavedAccounts$ = this._store.select(NgrxSelector_ATH.selectMySavedAccounts);

  removingAccount?: MySavedAccountModel;
  loggedUser?: MySavedAccountModel;
  readonly path = environment.contentDistributorBaseUrl;
  readonly tooltipProps: NgxTippyProps = {
    placement: 'bottom',
    theme: 'vsph-auth',
    animation: 'scale-subtle',
  };

  constructor(
    private readonly _myAccountsService: MyAccountsService,
    private readonly _store: Store<AuthReducer>
  ) {}

  handleCloseRemoveAccountModal(): void {
    this._myAccountsService.changeRemoveModalVisibility(false);
  }

  handleOpenAddNewAccountModal(): void {
    this._myAccountsService.changeAddNewModalVisibility(true);
  }

  handleOpenLoginModal(account: MySavedAccountModel): void {
    this.loggedUser = account;
    this._myAccountsService.changeLoginOnAccountModalVisibility(true);
  }

  handleMarkSelectedAccountAsRemoved(
    removingAccount: MySavedAccountModel
  ): void {
    this.removingAccount = removingAccount;
    this._myAccountsService.changeRemoveModalVisibility(true);
  }

  handleRemoveAccount(): void {
    this._myAccountsService.removeSelectedAccount(
      this.removingAccount?.accountId
    );
  }
}
