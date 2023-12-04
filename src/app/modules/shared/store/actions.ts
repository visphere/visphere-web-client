/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { createAction, props } from '@ngrx/store';
import { Severity, SnackbarI18n } from '~/shared-mod/types/snackbar.type';
import { LoggedUser } from '../models/logged-user.model';

const ADD_SNACKBAR = '[SHARED] ADD SNACKBAR' as const;
const REMOVE_SNACKBAR = '[SHARED] REMOVE SNACKBAR' as const;
const SET_LOGGED_USER_DETAILS = '[SHARED] SET LOGGED USER DETAILS' as const;
const REMOVE_USER_DETAILS = '[SHARED] REMOVE USER DETAILS' as const;
const UNSET_INITIAL_LOADING = '[SHARED] UNSET INITIAL LOADING' as const;
const SET_SETTINGS_RETURN_URL = '[SHARED] SET SETTINGS RETURN URL' as const;
const UPDATE_LOGGED_USER_LANG = '[SHARED] UPDATE LOGGED USER LANG' as const;
const UPDATE_LOGGED_USER_THEME = '[SHARED] UPDATE LOGGED USER THEME' as const;

export const __addSnackbar = createAction(
  ADD_SNACKBAR,
  props<{ header?: SnackbarI18n; content: SnackbarI18n; severity?: Severity }>()
);

export const __removeSnackbar = createAction(
  REMOVE_SNACKBAR,
  props<{ id?: string }>()
);

export const __setLoggedUserDetails = createAction(
  SET_LOGGED_USER_DETAILS,
  props<{ details: LoggedUser }>()
);

export const __removeUserDetails = createAction(REMOVE_USER_DETAILS);

export const __unsetInitialLoading = createAction(UNSET_INITIAL_LOADING);

export const __setSettingsReturnUrl = createAction(
  SET_SETTINGS_RETURN_URL,
  props<{ url: string }>()
);

export const __updateLoggedUserLang = createAction(
  UPDATE_LOGGED_USER_LANG,
  props<{ lang: string | null }>()
);

export const __updateLoggedUserTheme = createAction(
  UPDATE_LOGGED_USER_THEME,
  props<{ theme: string | null }>()
);
