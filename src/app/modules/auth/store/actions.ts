/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { createAction, props } from '@ngrx/store';

const SET_ACTIVATE_ACCOUNT_EMAIL = '[AUTH] SET ACTIVATE ACCOUNT EMAIL' as const;
const REMOVE_ACTIVATE_ACCOUNT_EMAIL =
  '[AUTH] REMOVE ACTIVATE ACCOUNT EMAIL' as const;

export const __setActivateAccountEmail = createAction(
  SET_ACTIVATE_ACCOUNT_EMAIL,
  props<{ email: string }>()
);

export const __removeActivateAccountEmail = createAction(
  REMOVE_ACTIVATE_ACCOUNT_EMAIL
);
