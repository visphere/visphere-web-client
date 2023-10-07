/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authReduxStore } from './reducer';
import { AuthStoreState } from './state';

export const selectAuthState = createFeatureSelector<AuthStoreState>(
  authReduxStore.reducerName
);

export const selectActivateAccountEmail = createSelector(
  selectAuthState,
  ({ activateAccountEmail }) => activateAccountEmail
);

export const selectIsActivateAccountEmailExist = createSelector(
  selectAuthState,
  ({ activateAccountEmail }) => activateAccountEmail !== ''
);

export const selectMySavedAccounts = createSelector(
  selectAuthState,
  ({ mySavedAccounts }) => mySavedAccounts
);

export const selectMySavedAccountsCount = createSelector(
  selectAuthState,
  ({ mySavedAccounts }) => mySavedAccounts.length
);

export const checkIfMySavedAccountAlreadyExist = (username: string) =>
  createSelector(
    selectAuthState,
    ({ mySavedAccounts }) =>
      !!mySavedAccounts.find(
        ({ usernameOrEmailAddress }) => usernameOrEmailAddress === username
      )
  );
