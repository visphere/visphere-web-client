/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AddNewMyAccountFormModel } from '~/auth-mod/models/add-new-my-account-form.model';
import {
  MyAccountReqDto,
  MySavedAccountModel,
} from '~/auth-mod/models/my-saved-account.model';
import * as NgrxAction_ATH from '~/auth-mod/store/actions';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { AbstractSimpleFormProvider } from '~/shared-mod/services/abstract-simple-form-provider';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import { ModalUtilsService } from '~/shared-mod/services/modal-utils/modal-utils.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { Severity } from '~/shared-mod/types/snackbar.type';
import { AuthHttpClientService } from '../auth-http-client/auth-http-client.service';

@Injectable()
export class MyAccountsService
  extends AbstractSimpleFormProvider<AddNewMyAccountFormModel>
  implements OnDestroy
{
  private _removeModalIsOpen$ = new BehaviorSubject(false);
  private _removeAllModalIsOpen$ = new BehaviorSubject(false);
  private _addNewModalIsOpen$ = new BehaviorSubject(false);
  private _loginOnAccountModalIsOpen$ = new BehaviorSubject(false);

  constructor(
    private readonly _modalUtilsService: ModalUtilsService,
    private readonly _store: Store<AuthReducer | SharedReducer>,
    private readonly _localStorageService: LocalStorageService,
    private readonly _authHttpClientService: AuthHttpClientService
  ) {
    super();
    this.wrapAsObservable(
      this._authHttpClientService.checkIfMyAccountsExists(
        this.mapAccountsToReqDtos()
      )
    ).subscribe(accounts => {
      this._store.dispatch(
        NgrxAction_ATH.__loadMySavedAccounts({
          accounts,
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
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

  override abstractSubmitForm(): Observable<AddNewMyAccountFormModel> {
    const { usernameOrEmailAddress } =
      this.parseFormValues<AddNewMyAccountFormModel>();

    this._store.dispatch(
      NgrxAction_ATH.__addNewMySavedAccount({
        account: {
          usernameOrEmailAddress,
          thumbnailUrl: '',
          isVerified: false,
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
    this._store.dispatch(NgrxAction_ATH.__removeMySavedAccount({ accountId }));
    this.changeRemoveModalVisibility(false);
    this.generateSuccessSnackbarResponse('removeMySavedAccount');
  }

  removeAllAccounts(): void {
    this._store.dispatch(NgrxAction_ATH.__removeAllMySavedAccount());
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
    return accounts.map(
      ({ usernameOrEmailAddress, isVerified, accountId }) => ({
        usernameOrEmailAddress,
        isVerified,
        accountId,
      })
    );
  }

  private generateSuccessSnackbarResponse(
    placeholder: string,
    severity: Severity = 'success'
  ): void {
    this._store.dispatch(
      NgrxAction_SHA.__addSnackbar({
        content: {
          i18nPrefix: 'msph.clientCommon.myAccountsPage.snackbars.',
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
}
