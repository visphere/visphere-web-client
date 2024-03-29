/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type RegisterReqDtoModel = {
  username: string;
  emailAddress: string;
  password: string;
  confirmedPassword: string;
  firstName: string;
  lastName: string;
  secondEmailAddress: string;
  enabledMfa: boolean;
  allowNotifs: boolean;
  birthDate: string;
};

export type RegisterFormModel = {
  firstStage: {
    username: string;
    emailAddress: string;
    password: string;
    confirmedPassword: string;
    birthDate: { day: number; month: number; year: number };
  };
  secondStage: {
    firstName: string;
    lastName: string;
    secondEmailAddress: string;
    allowNotifs: boolean;
    enabledMfa: boolean;
  };
};
