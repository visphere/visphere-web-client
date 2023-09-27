/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MyAccountsService } from '~/auth-mod/services/my-accounts/my-accounts.service';
import * as NgrxSelector_ATH from '~/auth-mod/store/selectors';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { FetchingState } from '~/shared-mod/types/fetching-state.type';

@Component({
  selector: 'msph-auth-my-accounts-page',
  templateUrl: './auth-my-accounts-page.component.html',
  host: { class: 'flex-grow flex flex-col' },
  providers: [MyAccountsService],
})
export class AuthMyAccountsPageComponent {
  isRemoveAllModalOpen$: Observable<boolean> =
    this._myAccountsService.removeAllModalIsOpen$;

  isAddNewModalOpen$: Observable<boolean> =
    this._myAccountsService.addNewModalIsOpen$;

  fetchingState$: Observable<FetchingState> =
    this._myAccountsService.fetchingState$;

  mySavedAccountsCount$: Observable<number> = this._store.select(
    NgrxSelector_ATH.selectMySavedAccountsCount
  );

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
