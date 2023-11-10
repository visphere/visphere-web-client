/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  MySavedAccountAuthFormModel,
  MySavedAccountModel,
} from '~/auth-mod/models/my-saved-account.model';
import * as NgrxAction_ATH from '~/auth-mod/store/actions';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { LoginResDtoModel } from '~/shared-mod/models/identity.model';
import { LoggedUser } from '~/shared-mod/models/logged-user.model';
import { AbstractSimpleFormProvider } from '~/shared-mod/services/abstract-simple-form-provider';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { LoginFlowService } from '../login-flow/login-flow.service';

@Injectable()
export class MyAccountsCredentialsService extends AbstractSimpleFormProvider<
  LoggedUser | undefined
> {
  private _loggedUser?: MySavedAccountModel;

  constructor(
    private readonly _store: Store<AuthReducer | SharedReducer>,
    private readonly _loginFlowService: LoginFlowService
  ) {
    super();
  }

  setLoggedUser(userAccount: MySavedAccountModel): void {
    this._loggedUser = userAccount;
  }

  override abstractSubmitForm(): Observable<LoginResDtoModel> {
    const { password } = this.parseFormValues<MySavedAccountAuthFormModel>();
    if (!this._loggedUser) {
      return of();
    }
    return this._loginFlowService.performLoginFlow(
      this._loggedUser?.usernameOrEmailAddress || '',
      password,
      () => this.setLoading(false),
      res => {
        this._store.dispatch(
          NgrxAction_ATH.__setMySavedAccountVerified({
            uuid: this._loggedUser!.accountId,
            thumbnailUrl: res.profileUrl,
            username: res.username,
          })
        );
      }
    );
  }
}
