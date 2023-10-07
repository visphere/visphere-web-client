/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

interface IRegexValidators {
  USERNAME: RegExp;
  USERNAME_OR_EMAIL: RegExp;
  OTA_TOKEN: RegExp;
  PASSWORD: RegExp;
}

export const regex: IRegexValidators = {
  USERNAME: /^[a-z\d_-]+$/,
  USERNAME_OR_EMAIL:
    /^(?![_.-])\b(?![.-])[\w.-]*(_\w*)?\b(@[a-z0-9]+([-_.][a-z0-9]+)*\.[a-z]{2,100})?$/,
  OTA_TOKEN: /^[a-zA-Z0-9]+$/,
  PASSWORD: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,80}$/,
};
