/*
 * Copyright (c) 2023 by MoonSphere Systems
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
