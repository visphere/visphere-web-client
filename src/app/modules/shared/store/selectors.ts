/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { sharedReduxStore } from './reducer';
import { SharedStoreState } from './state';

export const selectSharedState = createFeatureSelector<SharedStoreState>(
  sharedReduxStore.reducerName
);

export const selectSnackbarsStack = createSelector(
  selectSharedState,
  ({ snackbarStack }) => snackbarStack
);

export const selectUserIsLogged = createSelector(
  selectSharedState,
  ({ loggedUser, initialLoading }) => ({
    isUserLogged: !!loggedUser,
    isInitialLoading: initialLoading,
  })
);

export const selectSettingsReturnUrl = createSelector(
  selectSharedState,
  ({ settingsReturnUrl }) => settingsReturnUrl
);

export const selectLoggedUser = createSelector(
  selectSharedState,
  ({ loggedUser }) => loggedUser
);

export const selectLogoutModalIsOpen = createSelector(
  selectSharedState,
  ({ logoutModalIsOpen }) => logoutModalIsOpen
);

export const selectDisabledAccountModalIsOpen = createSelector(
  selectSharedState,
  ({ disabledAccount }) => disabledAccount.modalIsOpen
);

export const selectDisabledAccountAccessToken = createSelector(
  selectSharedState,
  ({ disabledAccount }) => disabledAccount.accessToken
);
