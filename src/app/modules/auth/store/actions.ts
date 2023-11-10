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

const SET_ACTIVATE_ACCOUNT_EMAIL = '[AUTH] SET ACTIVATE ACCOUNT EMAIL' as const;

const LOAD_MY_SAVED_ACCOUNTS = '[AUTH] LOAD MY SAVED ACCOUNTS' as const;

const REMOVE_ACTIVATE_ACCOUNT_EMAIL =
  '[AUTH] REMOVE ACTIVATE ACCOUNT EMAIL' as const;

const ADD_NEW_MY_SAVED_ACCOUNT = '[AUTH] ADD NEW MY SAVED ACCOUNT' as const;

const REMOVE_MY_SAVED_ACCOUNT = '[AUTH] REMOVE MY SAVED ACCOUNT' as const;

const REMOVE_ALL_MY_SAVED_ACCOUNT =
  '[AUTH] REMOVE ALL MY SAVED ACCOUNT' as const;

const SET_MY_SAVED_ACCOUNT_VERIFIED =
  '[AUTH] SET MY SAVED ACCOUNT VERIFIED' as const;

const SET_MFA_STATE = '[AUTH] SET MFA STATE' as const;
const REMOVE_MFA_STATE = '[AUTH] REMOVE MFA STATE' as const;

export const __setActivateAccountEmail = createAction(
  SET_ACTIVATE_ACCOUNT_EMAIL,
  props<{ email: string }>()
);

export const __removeActivateAccountEmail = createAction(
  REMOVE_ACTIVATE_ACCOUNT_EMAIL
);

export const __loadMySavedAccounts = createAction(
  LOAD_MY_SAVED_ACCOUNTS,
  props<{ accounts: MySavedAccountModel[] }>()
);

export const __addNewMySavedAccount = createAction(
  ADD_NEW_MY_SAVED_ACCOUNT,
  props<{ account: MySavedAccountPayload }>()
);

export const __removeMySavedAccount = createAction(
  REMOVE_MY_SAVED_ACCOUNT,
  props<{ accountId: string }>()
);

export const __removeAllMySavedAccount = createAction(
  REMOVE_ALL_MY_SAVED_ACCOUNT
);

export const __setMySavedAccountVerified = createAction(
  SET_MY_SAVED_ACCOUNT_VERIFIED,
  props<{ uuid: string; thumbnailUrl: string; username: string }>()
);

export const __setMfaState = createAction(
  SET_MFA_STATE,
  props<{ mfaState: MfaStateModel }>()
);

export const __removeMfaState = createAction(REMOVE_MFA_STATE);
