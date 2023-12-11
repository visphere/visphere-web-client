/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type UpdateAccountPasswordReqDto = {
  oldPassword: string;
  newPassword: string;
  confirmedNewPassword: string;
  logoutFromAll: boolean;
};
