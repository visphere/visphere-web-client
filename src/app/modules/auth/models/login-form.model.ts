/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type LoginReqDtoModel = {
  usernameOrEmailAddress: string;
  password: string;
};

export type LoginResDtoModel = {
  fullName: string;
  username: string;
  emailAddress: string;
  profileUrl: string;
  accessToken: string;
  refreshToken: string;
  isActivated: boolean;
};

export type LoginFormModel = LoginReqDtoModel & {
  rememberAccount: boolean;
};
