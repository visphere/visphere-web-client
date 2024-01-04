/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Action, createReducer, on } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import {
  actionAddSnackbar,
  actionCloseDisabledAccountModal,
  actionOpenDisabledAccountModal,
  actionPersistLoggedUserDetails,
  actionRemoveSnackbar,
  actionSetSettingsReturnUrl,
  actionUnsetInitialLoading,
  actionUpdateLoggedUserFullName,
  actionUpdateLoggedUserSettings,
  actionUpdateLoggedUserUsername,
  actionUpdateLogoutModalState,
  actionUpdateProfileColor,
  actionUpdateProfileImageUrl,
  removeUserDetailsAction,
} from './actions';
import { SharedStoreState, sharedStoreState } from './state';

const _reducer = createReducer(
  sharedStoreState,
  on(actionAddSnackbar, (state, action) => {
    const { header, content, severity } = action;
    return {
      ...state,
      snackbarStack: [
        { id: uuidv4(), header, content, severity },
        ...state.snackbarStack,
      ],
    };
  }),
  on(actionRemoveSnackbar, (state, action) => ({
    ...state,
    snackbarStack: action.id
      ? state.snackbarStack.filter(({ id }) => id !== action.id)
      : state.snackbarStack.slice(0, -1),
  })),
  on(actionPersistLoggedUserDetails, (state, action) => ({
    ...state,
    loggedUser: action.details,
  })),
  on(removeUserDetailsAction, state => ({
    ...state,
    loggedUser: null,
  })),
  on(actionUnsetInitialLoading, state => ({
    ...state,
    initialLoading: false,
  })),
  on(actionSetSettingsReturnUrl, (state, action) => ({
    ...state,
    settingsReturnUrl: action.url,
  })),
  on(actionUpdateLoggedUserSettings, (state, action) =>
    state.loggedUser
      ? {
          ...state,
          loggedUser: {
            ...state.loggedUser,
            settings: action.userSettings,
          },
        }
      : state
  ),
  on(actionUpdateLogoutModalState, (state, action) => ({
    ...state,
    logoutModalIsOpen: action.isOpen,
  })),
  on(actionUpdateLoggedUserFullName, (state, action) =>
    state.loggedUser
      ? {
          ...state,
          loggedUser: {
            ...state.loggedUser,
            fullName: action.fullName,
          },
        }
      : state
  ),
  on(actionUpdateLoggedUserUsername, (state, action) =>
    state.loggedUser
      ? {
          ...state,
          loggedUser: {
            ...state.loggedUser,
            username: action.username,
          },
        }
      : state
  ),
  on(actionOpenDisabledAccountModal, (state, action) => ({
    ...state,
    disabledAccount: {
      accessToken: action.accessToken,
      modalIsOpen: true,
    },
  })),
  on(actionCloseDisabledAccountModal, state => ({
    ...state,
    disabledAccount: {
      accessToken: '',
      modalIsOpen: false,
    },
  })),
  on(actionUpdateProfileImageUrl, (state, action) =>
    state.loggedUser
      ? {
          ...state,
          loggedUser: {
            ...state.loggedUser,
            profileUrl: action.imageUrl,
          },
        }
      : state
  ),
  on(actionUpdateProfileColor, (state, action) =>
    state.loggedUser
      ? {
          ...state,
          loggedUser: {
            ...state.loggedUser,
            profileColor: action.color,
          },
        }
      : state
  )
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
