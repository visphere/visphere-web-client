/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type LoginResDtoModel = {
  fullName: string;
  username: string;
  emailAddress: string;
  profileUrl: string;
  accessToken: string;
  refreshToken: string;
  lang: string;
  theme: string;
  isActivated: boolean;
  isMfaEnabled: boolean;
  isMfaSetup: boolean;
};

export type RefreshTokenReqDto = {
  expiredAccessToken: string;
  refreshToken: string;
};

export type RefreshTokenResDto = {
  renewAccessToken: string;
  refreshToken: string;
};

export type StorageKeys = {
  accessToken: string;
  refreshToken: string;
};
