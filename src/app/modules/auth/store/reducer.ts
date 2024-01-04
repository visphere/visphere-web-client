/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Action, createReducer, on } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import {
  actionAddNewMySavedAccount,
  actionLoadMySavedAccounts,
  actionRemoveActivateAccountEmail,
  actionRemoveAllMySavedAccount,
  actionRemoveMfaState,
  actionRemoveMySavedAccount,
  actionSetActivateAccountEmail,
  actionSetMfaState,
  actionSetMySavedAccountVerified,
} from './actions';
import { AuthStoreState, authStoreState } from './state';

const _reducer = createReducer(
  authStoreState,
  on(actionSetActivateAccountEmail, (state, action) => ({
    ...state,
    activateAccountEmail: action.email,
  })),
  on(actionRemoveActivateAccountEmail, state => ({
    ...state,
    activateAccountEmail: '',
  })),
  on(actionLoadMySavedAccounts, (state, action) => ({
    ...state,
    mySavedAccounts: action.accounts,
  })),
  on(actionAddNewMySavedAccount, (state, action) => ({
    ...state,
    mySavedAccounts: [
      ...state.mySavedAccounts,
      {
        accountId: uuidv4(),
        ...action.account,
      },
    ],
  })),
  on(actionRemoveMySavedAccount, (state, action) => ({
    ...state,
    mySavedAccounts: state.mySavedAccounts.filter(
      ({ accountId }) => accountId !== action.accountId
    ),
  })),
  on(actionRemoveAllMySavedAccount, state => ({
    ...state,
    mySavedAccounts: [],
  })),
  on(
    actionSetMySavedAccountVerified,
    (state, { thumbnailUrl, username, uuid }) => {
      const alreadyExist = !!state.mySavedAccounts.find(
        ({ usernameOrEmailAddress, accountId }) =>
          usernameOrEmailAddress === username && accountId !== uuid
      );
      return alreadyExist
        ? {
            ...state,
            mySavedAccounts: state.mySavedAccounts.filter(
              ({ accountId }) => accountId !== uuid
            ),
          }
        : {
            ...state,
            mySavedAccounts: state.mySavedAccounts.map(account =>
              account.accountId === uuid
                ? {
                    ...account,
                    thumbnailUrl,
                    usernameOrEmailAddress: username,
                    verified: true,
                  }
                : account
            ),
          };
    }
  ),
  on(actionSetMfaState, (state, { mfaState }) => ({
    ...state,
    mfaState,
  })),
  on(actionRemoveMfaState, state => ({
    ...state,
    mfaState: undefined,
  }))
);

export const authReduxStore = {
  reducerName: 'authStoreReducer' as const,
  reducerFunction: function reducer(
    state: AuthStoreState,
    action: Action
  ): AuthStoreState {
    return _reducer(state, action);
  },
};
