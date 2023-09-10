/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Action, createReducer, on } from '@ngrx/store';
import * as NgrxAction from './actions';
import { AuthStoreState, authStoreState } from './state';

const _reducer = createReducer(
  authStoreState,
  on(NgrxAction.__setActivateAccountEmail, (state, action) => {
    return {
      ...state,
      activateAccountEmail: action.email,
    };
  }),
  on(NgrxAction.__removeActivateAccountEmail, state => ({
    ...state,
    activateAccountEmail: '',
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
