/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Action, createReducer, on } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import * as NgrxAction from './actions';
import { SharedStoreState, sharedStoreState } from './state';

const _reducer = createReducer(
  sharedStoreState,
  on(NgrxAction.__addSnackbar, (state, action) => {
    const { header, content, severity } = action;
    return {
      ...state,
      snackbarStack: [
        { id: uuidv4(), header, content, severity },
        ...state.snackbarStack,
      ],
    };
  }),
  on(NgrxAction.__removeSnackbar, (state, action) => ({
    ...state,
    snackbarStack: action.id
      ? state.snackbarStack.filter(({ id }) => id !== action.id)
      : state.snackbarStack.slice(0, -1),
  })),
  on(NgrxAction.__setLoggedUserDetails, (state, action) => ({
    ...state,
    loggedUser: action.details,
  })),
  on(NgrxAction.__removeUserDetails, state => ({
    ...state,
    loggedUser: null,
  })),
  on(NgrxAction.__unsetInitialLoading, state => ({
    ...state,
    initialLoading: false,
  }))
);

export const sharedReduxStore = {
  reducerName: 'sharedStoreReducer' as const,
  reducerFunction: function reducer(
    state: SharedStoreState,
    action: Action
  ): SharedStoreState {
    return _reducer(state, action);
  },
};
