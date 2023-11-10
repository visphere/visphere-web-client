/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type LoginReqDtoModel = {
  usernameOrEmailAddress: string;
  password: string;
};

export type LoginFormModel = LoginReqDtoModel & {
  rememberAccount: boolean;
};
