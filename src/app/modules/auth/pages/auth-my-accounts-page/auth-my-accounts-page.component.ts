/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MyAccountsService } from '~/auth-mod/services/my-accounts/my-accounts.service';
import { selectMySavedAccountsCount } from '~/auth-mod/store/selectors';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';

@Component({
  selector: 'vsph-auth-my-accounts-page',
  templateUrl: './auth-my-accounts-page.component.html',
  host: { class: 'flex-grow flex flex-col' },
  providers: [MyAccountsService],
})
export class AuthMyAccountsPageComponent {
  isRemoveAllModalOpen$ = this._myAccountsService.removeAllModalIsOpen$;
  isAddNewModalOpen$ = this._myAccountsService.addNewModalIsOpen$;
  fetchingState$ = this._myAccountsService.fetchingState$;

  mySavedAccountsCount$ = this._store.select(selectMySavedAccountsCount);

  constructor(
    private readonly _myAccountsService: MyAccountsService,
    private readonly _store: Store<AuthReducer>
  ) {}

  handleToggleRemoveAllAccountsModalVisibility(isVisible: boolean): void {
    this._myAccountsService.changeRemoveAllModalVisibility(isVisible);
  }

  handleRemoveAllAccounts(): void {
    this._myAccountsService.removeAllAccounts();
  }

  handleAddNewAccount(): void {
    this._myAccountsService.changeAddNewModalVisibility(true);
  }
}
