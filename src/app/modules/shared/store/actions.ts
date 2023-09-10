/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { createAction, props } from '@ngrx/store';
import { Severity, SnackbarI18n } from '~/shared-mod/types/snackbar.type';

const ADD_SNACKBAR = '[SHARED] ADD SNACKBAR' as const;
const REMOVE_SNACKBAR = '[SHARED] REMOVE SNACKBAR' as const;

export const __addSnackbar = createAction(
  ADD_SNACKBAR,
  props<{ header?: SnackbarI18n; content: SnackbarI18n; severity?: Severity }>()
);

export const __removeSnackbar = createAction(
  REMOVE_SNACKBAR,
  props<{ id?: string }>()
);
