/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

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
  };
};
