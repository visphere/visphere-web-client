/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type MfaAuthenticatorDataResDto = {
  imageUri: string;
  secret: string;
};

export type MfaCodeForm = {
  code: string;
};

export type MfaTokenForm = {
  token: string;
};

export type MfaStateModel = {
  usernameOrEmailAddress: string;
  password: string;
  isMfaSetup: boolean;
};
