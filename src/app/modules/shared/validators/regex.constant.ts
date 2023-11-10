/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

type RegexValidators = {
  USERNAME: RegExp;
  USERNAME_OR_EMAIL: RegExp;
  PASSWORD: RegExp;
  MFA_CODE: RegExp;
};

export const regex: RegexValidators = {
  USERNAME: /^[a-z\d_-]+$/,
  USERNAME_OR_EMAIL:
    /^(?![_.-])\b(?![.-])[\w.-]*(_\w*)?\b(@[a-z0-9]+([-_.][a-z0-9]+)*\.[a-z]{2,100})?$/,
  PASSWORD: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,80}$/,
  MFA_CODE: /^[\d]+$/,
};
