/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type MySavedAccountsErrorType = 'fetchError' | 'noAccounts';

export type MySavedAccountErrors = {
  [key in MySavedAccountsErrorType]: {
    topImage: string;
    i18nSuffix: string;
  };
};
