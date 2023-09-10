/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export interface AuthStoreState {
  activateAccountEmail: string;
}

export const authStoreState: AuthStoreState = {
  activateAccountEmail: 'mocked@gmail.com',
};
