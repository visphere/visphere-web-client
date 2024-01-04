/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { createAction, props } from '@ngrx/store';
import { MfaStateModel } from '../models/mfa-data.model';
import {
  MySavedAccountModel,
  MySavedAccountPayload,
} from '../models/my-saved-account.model';

enum Action {
  SET_ACTIVATE_ACCOUNT_EMAIL = '[AUTH] SET ACTIVATE ACCOUNT EMAIL',
  LOAD_MY_SAVED_ACCOUNTS = '[AUTH] LOAD MY SAVED ACCOUNTS',
  REMOVE_ACTIVATE_ACCOUNT_EMAIL = '[AUTH] REMOVE ACTIVATE ACCOUNT EMAIL',
  ADD_NEW_MY_SAVED_ACCOUNT = '[AUTH] ADD NEW MY SAVED ACCOUNT',
  REMOVE_MY_SAVED_ACCOUNT = '[AUTH] REMOVE MY SAVED ACCOUNT',
  REMOVE_ALL_MY_SAVED_ACCOUNT = '[AUTH] REMOVE ALL MY SAVED ACCOUNT',
  SET_MY_SAVED_ACCOUNT_VERIFIED = '[AUTH] SET MY SAVED ACCOUNT VERIFIED',
  SET_MFA_STATE = '[AUTH] SET MFA STATE',
  REMOVE_MFA_STATE = '[AUTH] REMOVE MFA STATE',
}

export const actionSetActivateAccountEmail = createAction(
  Action.SET_ACTIVATE_ACCOUNT_EMAIL,
  props<{ email: string }>()
);

export const actionRemoveActivateAccountEmail = createAction(
  Action.REMOVE_ACTIVATE_ACCOUNT_EMAIL
);

export const actionLoadMySavedAccounts = createAction(
  Action.LOAD_MY_SAVED_ACCOUNTS,
  props<{ accounts: MySavedAccountModel[] }>()
);

export const actionAddNewMySavedAccount = createAction(
  Action.ADD_NEW_MY_SAVED_ACCOUNT,
  props<{ account: MySavedAccountPayload }>()
);

export const actionRemoveMySavedAccount = createAction(
  Action.REMOVE_MY_SAVED_ACCOUNT,
  props<{ accountId: string }>()
);

export const actionRemoveAllMySavedAccount = createAction(
  Action.REMOVE_ALL_MY_SAVED_ACCOUNT
);

export const actionSetMySavedAccountVerified = createAction(
  Action.SET_MY_SAVED_ACCOUNT_VERIFIED,
  props<{ uuid: string; thumbnailUrl: string; username: string }>()
);

export const actionSetMfaState = createAction(
  Action.SET_MFA_STATE,
  props<{ mfaState: MfaStateModel }>()
);

export const actionRemoveMfaState = createAction(Action.REMOVE_MFA_STATE);
