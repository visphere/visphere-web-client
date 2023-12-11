/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type UserPersistedNofisSettings = {
  isPushNotifsSelected: boolean;
  isPushNotifsSoundSelected: boolean;
};

export type UserNotifSettingsResDto = {
  isEmailNotifsEnabled: boolean;
};

export type UserNotifSettings = {
  isEmailNotifsSelected: boolean;
};
