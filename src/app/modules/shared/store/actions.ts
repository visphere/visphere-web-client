/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { createAction, props } from '@ngrx/store';
import { Severity, SnackbarI18n } from '~/shared-mod/types/snackbar.type';
import { LoginResDtoModel } from '../models/identity.model';
import { LoggedUser } from '../models/logged-user.model';

enum Action {
  ADD_SNACKBAR = '[SHARED] ADD SNACKBAR',
  REMOVE_SNACKBAR = '[SHARED] REMOVE SNACKBAR',
  SET_LOGGED_USER_DETAILS = '[SHARED] SET LOGGED USER DETAILS',
  PERSIST_LOGGED_USER_DETAILS = '[SHARED] PERSIST LOGGED USER DETAILS',
  REMOVE_USER_DETAILS = '[SHARED] REMOVE USER DETAILS',
  UNSET_INITIAL_LOADING = '[SHARED] UNSET INITIAL LOADING',
  SET_SETTINGS_RETURN_URL = '[SHARED] SET SETTINGS RETURN URL',
  UPDATE_LOGGED_USER_LANG = '[SHARED] UPDATE LOGGED USER LANG',
  UPDATE_LOGGED_USER_THEME = '[SHARED] UPDATE LOGGED USER THEME',
  UPDATE_LOGOUT_MODAL_STATE = '[SHARED] UPDATE LOGOUT MODAL STATE',
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

export const __updateLoggedUserLang = createAction(
  Action.UPDATE_LOGGED_USER_LANG,
  props<{ lang: string | null }>()
);

export const __updateLoggedUserTheme = createAction(
  Action.UPDATE_LOGGED_USER_THEME,
  props<{ theme: string | null }>()
);

export const __updateLogoutModalState = createAction(
  Action.UPDATE_LOGOUT_MODAL_STATE,
  props<{ isOpen: boolean }>()
);
