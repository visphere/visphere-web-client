/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type LoginResDtoModel = {
  id: number;
  fullName: string;
  username: string;
  emailAddress: string;
  profileUrl: string;
  profileColor: string;
  accessToken: string;
  refreshToken: string;
  credentialsSupplier: string;
  imageFromExternalProvider: boolean;
  isActivated: boolean;
  isDisabled: boolean;
  isMfaEnabled: boolean;
  isMfaSetup: boolean;
  joinDate: string;
  settings: UserSettings;
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

export type UserSettings = {
  lang: string | null;
  theme: string | null;
  pushNotifsEnabled: boolean;
  pushNotifsSoundEnabled: boolean;
};
