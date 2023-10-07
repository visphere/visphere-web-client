/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type MySavedAccountPayload = {
  usernameOrEmailAddress: string;
  thumbnailUrl: string;
  isVerified: boolean;
};

export type MySavedAccountModel = MySavedAccountPayload & {
  accountId: string;
};

export type MySavedAccountAuthFormModel = {
  password: string;
};

export type MyAccountReqDto = {
  accountId: string;
  usernameOrEmailAddress: string;
  isVerified: boolean;
};
