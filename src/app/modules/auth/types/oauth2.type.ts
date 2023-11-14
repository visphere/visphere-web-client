/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type Oauth2Type = 'google' | 'facebook' | 'x';

type OauthStyleType = {
  [key in Oauth2Type]: {
    btn: string;
    spn: string;
  };
};

export const oauth2Style: OauthStyleType = {
  google: {
    btn: 'vsph-auth__google-oauth-button',
    spn: 'vsph-button-spinner__carousel--google',
  },
  facebook: {
    btn: 'vsph-auth__facebook-oauth-button',
    spn: 'vsph-button-spinner__carousel--facebook',
  },
  x: {
    btn: 'vsph-auth__x-oauth-button',
    spn: 'vsph-button-spinner__carousel--x',
  },
};
