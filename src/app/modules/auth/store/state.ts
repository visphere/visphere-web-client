/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { MySavedAccountModel } from '../models/my-saved-account.model';

export interface AuthStoreState {
  activateAccountEmail: string;
  mySavedAccounts: MySavedAccountModel[];
}

export const authStoreState: AuthStoreState = {
  activateAccountEmail: '',
  mySavedAccounts: [],
};
