/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Snackbar } from '~/shared-mod/types/snackbar.type';
import { LoggedUser } from '../models/logged-user.model';

export interface SharedStoreState {
  snackbarStack: Snackbar[];
  loggedUser: LoggedUser | null;
}

export const sharedStoreState: SharedStoreState = {
  snackbarStack: [],
  loggedUser: null,
};
