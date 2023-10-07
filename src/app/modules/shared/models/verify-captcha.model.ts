/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type IpAddressModel = {
  ip: string;
};

export type VerifyCaptchaModel = {
  response: string;
  remoteIp: string;
  siteKey: string;
};

export type CaptchaEvent = Event & {
  token: string;
};
