/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type PasswordConfirmationReqDto = {
  password: string;
  mfaCode: string;
};
