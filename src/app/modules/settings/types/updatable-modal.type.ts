/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type UpdatableModalType =
  | 'full-name'
  | 'username'
  | 'email'
  | 'birth-date'
  | 'password'
  | 'second-email'
  | 'delete-second-email'
  | 'disable-account'
  | 'delete-account'
  | 'reset-mfa'
  | 'none';

export type EmailVariant = 'first' | 'second';
