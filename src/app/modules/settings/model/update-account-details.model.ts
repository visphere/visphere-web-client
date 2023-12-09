/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type UpdateAccountDetailsReqDto = {
  firstName: string;
  lastName: string;
  username: string;
  birthDate: string;
};

export type UpdateAccountDetailsResDto = {
  message: string;
  accessToken: string;
};
