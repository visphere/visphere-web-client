/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Action, createReducer, on } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import * as NgrxAction from './actions';
import { AuthStoreState, authStoreState } from './state';

const _reducer = createReducer(
  authStoreState,
  on(NgrxAction.__setActivateAccountEmail, (state, action) => ({
    ...state,
    activateAccountEmail: action.email,
  })),
  on(NgrxAction.__removeActivateAccountEmail, state => ({
    ...state,
    activateAccountEmail: '',
  })),
  on(NgrxAction.__loadMySavedAccounts, (state, action) => ({
    ...state,
    mySavedAccounts: action.accounts,
  })),
  on(NgrxAction.__addNewMySavedAccount, (state, action) => ({
    ...state,
    mySavedAccounts: [
      ...state.mySavedAccounts,
      {
        accountId: uuidv4(),
        ...action.account,
      },
    ],
  })),
  on(NgrxAction.__removeMySavedAccount, (state, action) => ({
    ...state,
    mySavedAccounts: state.mySavedAccounts.filter(
      ({ accountId }) => accountId !== action.accountId
    ),
  })),
  on(NgrxAction.__removeAllMySavedAccount, state => ({
    ...state,
    mySavedAccounts: [],
  })),
  on(
    NgrxAction.__setMySavedAccountVerified,
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
                    isVerified: true,
                  }
                : account
            ),
          };
    }
  )
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
