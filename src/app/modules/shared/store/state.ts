/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Snackbar } from '~/shared-mod/types/snackbar.type';

export interface SharedStoreState {
  snackbarStack: Snackbar[];
}

export const sharedStoreState: SharedStoreState = {
  snackbarStack: [],
};
