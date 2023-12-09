/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type UpdateEmailReqDto = {
  emailAddress: string;
};

export type UpdateSecondEmailReqDto = {
  secondEmailAddress: string;
};

export type FinishUpdateEmailForm = {
  token: string;
};
