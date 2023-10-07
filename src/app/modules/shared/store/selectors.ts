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
