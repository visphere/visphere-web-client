/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { createAction, props } from '@ngrx/store';
import { Severity, SnackbarI18n } from '~/shared-mod/types/snackbar.type';
import { LoginResDtoModel, UserSettings } from '../models/identity.model';
import { LoggedUser } from '../models/logged-user.model';

enum Action {
  ADD_SNACKBAR = '[SHARED] ADD SNACKBAR',
  REMOVE_SNACKBAR = '[SHARED] REMOVE SNACKBAR',
  SET_LOGGED_USER_DETAILS = '[SHARED] SET LOGGED USER DETAILS',
  PERSIST_LOGGED_USER_DETAILS = '[SHARED] PERSIST LOGGED USER DETAILS',
  REMOVE_USER_DETAILS = '[SHARED] REMOVE USER DETAILS',
  UNSET_INITIAL_LOADING = '[SHARED] UNSET INITIAL LOADING',
  SET_SETTINGS_RETURN_URL = '[SHARED] SET SETTINGS RETURN URL',
  UPDATE_LOGGED_USER_SETTINGS = '[SHARED] UPDATE LOGGED USER SETTINGS',
  UPDATE_LOGOUT_MODAL_STATE = '[SHARED] UPDATE LOGOUT MODAL STATE',
  UPDATE_LOGGED_USER_FULL_NAME = '[SHARED] UPDATE LOGGED USER FULL NAME',
  UPDATE_LOGGED_USER_USERNAME = '[SHARED] UPDATE LOGGED USER USERNAME',
  OPEN_DISABLED_ACCOUNT_MODAL = '[SHARED] OPEN ACCOUNT DISABLED MODAL',
  CLOSE_DISABLED_ACCOUNT_MODAL = '[SHARED] CLOSE ACCOUNT DISABLED MODAL',
  UPDATE_PROFILE_IMAGE_URL = '[SHARED] UPDATE PROFILE IMAGE URL',
  UPDATE_PROFILE_COLOR = '[SHARED] UPDATE PROFILE COLOR',
}

export const actionAddSnackbar = createAction(
  Action.ADD_SNACKBAR,
  props<{ header?: SnackbarI18n; content: SnackbarI18n; severity?: Severity }>()
);

export const actionRemoveSnackbar = createAction(
  Action.REMOVE_SNACKBAR,
  props<{ id?: string }>()
);

export const actionSetLoggedUserDetails = createAction(
  Action.SET_LOGGED_USER_DETAILS,
  props<{ details: LoginResDtoModel }>()
);

export const actionPersistLoggedUserDetails = createAction(
  Action.PERSIST_LOGGED_USER_DETAILS,
  props<{ details: LoggedUser }>()
);

export const removeUserDetailsAction = createAction(Action.REMOVE_USER_DETAILS);

export const actionUnsetInitialLoading = createAction(
  Action.UNSET_INITIAL_LOADING
);

export const actionSetSettingsReturnUrl = createAction(
  Action.SET_SETTINGS_RETURN_URL,
  props<{ url: string }>()
);

export const actionUpdateLoggedUserSettings = createAction(
  Action.UPDATE_LOGGED_USER_SETTINGS,
  props<{ userSettings: UserSettings }>()
);

export const actionUpdateLogoutModalState = createAction(
  Action.UPDATE_LOGOUT_MODAL_STATE,
  props<{ isOpen: boolean }>()
);

export const actionUpdateLoggedUserFullName = createAction(
  Action.UPDATE_LOGGED_USER_FULL_NAME,
  props<{ fullName: string }>()
);

export const actionUpdateLoggedUserUsername = createAction(
  Action.UPDATE_LOGGED_USER_USERNAME,
  props<{ username: string }>()
);

export const actionOpenDisabledAccountModal = createAction(
  Action.OPEN_DISABLED_ACCOUNT_MODAL,
  props<{ accessToken: string }>()
);

export const actionCloseDisabledAccountModal = createAction(
  Action.CLOSE_DISABLED_ACCOUNT_MODAL
);

export const actionUpdateProfileImageUrl = createAction(
  Action.UPDATE_PROFILE_IMAGE_URL,
  props<{ imageUrl: string }>()
);

export const actionUpdateProfileColor = createAction(
  Action.UPDATE_PROFILE_COLOR,
  props<{ color: string }>()
);
