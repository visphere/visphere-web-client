/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { Observable } from 'rxjs';
import { MySavedAccountModel } from '~/auth-mod/models/my-saved-account.model';
import { MyAccountsService } from '~/auth-mod/services/my-accounts/my-accounts.service';
import * as NgrxSelector_ATH from '~/auth-mod/store/selectors';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { environment } from '~/env/environment';
import { FetchingState } from '~/shared-mod/types/fetching-state.type';

@Component({
  selector: 'msph-my-saved-accounts',
  templateUrl: './my-saved-accounts.component.html',
})
export class MySavedAccountsComponent {
  isRemoveModalOpen$: Observable<boolean> =
    this._myAccountsService.removeModalIsOpen$;
  fetchingState$: Observable<FetchingState> =
    this._myAccountsService.fetchingState$;

  mySavedAccounts$: Observable<MySavedAccountModel[]> = this._store.select(
    NgrxSelector_ATH.selectMySavedAccounts
  );

  removingAccount?: MySavedAccountModel;
  loggedUser?: MySavedAccountModel;
  cdnPath = environment.contentDistributorBaseUrl;
  tooltipProps: NgxTippyProps = {
    placement: 'bottom',
    theme: 'msph-viewport',
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
