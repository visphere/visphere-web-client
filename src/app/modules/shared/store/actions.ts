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

export const __addSnackbar = createAction(
  Action.ADD_SNACKBAR,
  props<{ header?: SnackbarI18n; content: SnackbarI18n; severity?: Severity }>()
);

export const __removeSnackbar = createAction(
  Action.REMOVE_SNACKBAR,
  props<{ id?: string }>()
);

export const __setLoggedUserDetails = createAction(
  Action.SET_LOGGED_USER_DETAILS,
  props<{ details: LoginResDtoModel }>()
);

export const __persistLoggedUserDetails = createAction(
  Action.PERSIST_LOGGED_USER_DETAILS,
  props<{ details: LoggedUser }>()
);

export const __removeUserDetails = createAction(Action.REMOVE_USER_DETAILS);

export const __unsetInitialLoading = createAction(Action.UNSET_INITIAL_LOADING);

export const __setSettingsReturnUrl = createAction(
  Action.SET_SETTINGS_RETURN_URL,
  props<{ url: string }>()
);

export const __updateLoggedUserSettings = createAction(
  Action.UPDATE_LOGGED_USER_SETTINGS,
  props<{ userSettings: UserSettings }>()
);

export const __updateLogoutModalState = createAction(
  Action.UPDATE_LOGOUT_MODAL_STATE,
  props<{ isOpen: boolean }>()
);

export const __updateLoggedUserFullName = createAction(
  Action.UPDATE_LOGGED_USER_FULL_NAME,
  props<{ fullName: string }>()
);

export const __updateLoggedUserUsername = createAction(
  Action.UPDATE_LOGGED_USER_USERNAME,
  props<{ username: string }>()
);

export const __openDisabledAccountModal = createAction(
  Action.OPEN_DISABLED_ACCOUNT_MODAL,
  props<{ accessToken: string }>()
);

export const __closeDisabledAccountModal = createAction(
  Action.CLOSE_DISABLED_ACCOUNT_MODAL
);

export const __updateProfileImageUrl = createAction(
  Action.UPDATE_PROFILE_IMAGE_URL,
  props<{ imageUrl: string }>()
);

export const __updateProfileColor = createAction(
  Action.UPDATE_PROFILE_COLOR,
  props<{ color: string }>()
);
