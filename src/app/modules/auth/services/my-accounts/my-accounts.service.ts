/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';
import { AddNewMyAccountFormModel } from '~/auth-mod/models/add-new-my-account-form.model';
import {
  MyAccountReqDto,
  MySavedAccountModel,
} from '~/auth-mod/models/my-saved-account.model';
import {
  actionAddNewMySavedAccount,
  actionLoadMySavedAccounts,
  actionRemoveAllMySavedAccount,
  actionRemoveMySavedAccount,
} from '~/auth-mod/store/actions';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { AbstractSimpleFormProvider } from '~/shared-mod/services/abstract-simple-form-provider';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import { ModalUtilsService } from '~/shared-mod/services/modal-utils/modal-utils.service';
import { actionAddSnackbar } from '~/shared-mod/store/actions';
import { FetchingState } from '~/shared-mod/types/fetching-state.type';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { Severity } from '~/shared-mod/types/snackbar.type';
import { AuthHttpClientService } from '../auth-http-client/auth-http-client.service';

@Injectable()
export class MyAccountsService extends AbstractSimpleFormProvider<AddNewMyAccountFormModel> {
  private _removeModalIsOpen$ = new BehaviorSubject(false);
  private _removeAllModalIsOpen$ = new BehaviorSubject(false);
  private _addNewModalIsOpen$ = new BehaviorSubject(false);
  private _loginOnAccountModalIsOpen$ = new BehaviorSubject(false);
  private _fetchingState$ = new BehaviorSubject<FetchingState>('pending');

  constructor(
    private readonly _modalUtilsService: ModalUtilsService,
    private readonly _store: Store<AuthReducer | SharedReducer>,
    private readonly _localStorageService: LocalStorageService,
    private readonly _authHttpClientService: AuthHttpClientService
  ) {
    super();
  }

  loadMyAccounts$(): Observable<null> {
    return this._authHttpClientService
      .checkIfMyAccountsExists$(this.mapAccountsToReqDtos())
      .pipe(
        map(accounts => {
          this._fetchingState$.next('success');
          this._store.dispatch(
            actionLoadMySavedAccounts({
              accounts,
            })
          );
          return null;
        }),
        catchError(err => throwError(() => err))
      );
  }

  changeRemoveModalVisibility(isOpen: boolean): void {
    this._modalUtilsService.blockBodyScroll(isOpen);
    this._removeModalIsOpen$.next(isOpen);
  }

  changeRemoveAllModalVisibility(isOpen: boolean): void {
    this._modalUtilsService.blockBodyScroll(isOpen);
    this._removeAllModalIsOpen$.next(isOpen);
  }

  changeAddNewModalVisibility(isOpen: boolean): void {
    this._modalUtilsService.blockBodyScroll(isOpen);
    this._addNewModalIsOpen$.next(isOpen);
  }

  changeLoginOnAccountModalVisibility(isOpen: boolean): void {
    this._modalUtilsService.blockBodyScroll(isOpen);
    this._loginOnAccountModalIsOpen$.next(isOpen);
  }

  override abstractSubmitForm$(): Observable<AddNewMyAccountFormModel> {
    const { usernameOrEmailAddress } =
      this.parseFormValues<AddNewMyAccountFormModel>();
    this._store.dispatch(
      actionAddNewMySavedAccount({
        account: {
          usernameOrEmailAddress,
          thumbnailUrl: '',
          verified: false,
        },
      })
    );
    this.generateSuccessSnackbarResponse('addNewMySavedAccount');
    return of({ usernameOrEmailAddress });
  }

  removeSelectedAccount(accountId: string | undefined): void {
    if (!accountId) {
      return;
    }
    this._store.dispatch(actionRemoveMySavedAccount({ accountId }));
    this.changeRemoveModalVisibility(false);
    this.generateSuccessSnackbarResponse('removeMySavedAccount');
  }

  removeAllAccounts(): void {
    this._store.dispatch(actionRemoveAllMySavedAccount());
    this.changeRemoveAllModalVisibility(false);
    this.generateSuccessSnackbarResponse('removeAllMySavedAccounts');
  }

  private mapAccountsToReqDtos(): MyAccountReqDto[] {
    const accounts =
      this._localStorageService.get<MySavedAccountModel[]>('mySavedAccounts') ||
      [];
    if (accounts.length === 0) {
      return [];
    }
    return accounts.map(({ usernameOrEmailAddress, verified, accountId }) => ({
      usernameOrEmailAddress,
      verified,
      accountId,
    }));
  }

  private generateSuccessSnackbarResponse(
    placeholder: string,
    severity: Severity = 'success'
  ): void {
    this._store.dispatch(
      actionAddSnackbar({
        content: {
          i18nPrefix: 'vsph.clientCommon.myAccountsPage.snackbars.',
          placeholder,
        },
        severity,
      })
    );
  }

  get removeModalIsOpen$(): Observable<boolean> {
    return this._removeModalIsOpen$.asObservable();
  }
  get removeAllModalIsOpen$(): Observable<boolean> {
    return this._removeAllModalIsOpen$.asObservable();
  }
  get addNewModalIsOpen$(): Observable<boolean> {
    return this._addNewModalIsOpen$.asObservable();
  }
  get loginOnAccountModalIsOpen$(): Observable<boolean> {
    return this._loginOnAccountModalIsOpen$.asObservable();
  }
  get fetchingState$(): Observable<FetchingState> {
    return this._fetchingState$.asObservable();
  }
}
