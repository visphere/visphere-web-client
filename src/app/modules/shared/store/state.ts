/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Snackbar } from '~/shared-mod/types/snackbar.type';
import { DisabledAccount, LoggedUser } from '../models/logged-user.model';

export interface SharedStoreState {
  snackbarStack: Snackbar[];
  loggedUser: LoggedUser | null;
  initialLoading: boolean;
  settingsReturnUrl: string;
  logoutModalIsOpen: boolean;
  disabledAccount: DisabledAccount;
}

export const sharedStoreState: SharedStoreState = {
  snackbarStack: [],
  loggedUser: null,
  initialLoading: true,
  settingsReturnUrl: '',
  logoutModalIsOpen: false,
  disabledAccount: {
    accessToken: '',
    modalIsOpen: false,
  },
};
