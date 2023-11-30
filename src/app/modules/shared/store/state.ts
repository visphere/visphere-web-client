/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Snackbar } from '~/shared-mod/types/snackbar.type';
import { LoggedUser } from '../models/logged-user.model';

export interface SharedStoreState {
  snackbarStack: Snackbar[];
  loggedUser: LoggedUser | null;
  initialLoading: boolean;
}

export const sharedStoreState: SharedStoreState = {
  snackbarStack: [],
  loggedUser: null,
  initialLoading: true,
};
