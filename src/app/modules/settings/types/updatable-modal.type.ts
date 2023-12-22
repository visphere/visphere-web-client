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

export type ProfileImageUpdatableModalType =
  | 'upload-image'
  | 'delete-image'
  | 'none';

export type UpdateSphereGuildOverviewModalType =
  | 'change-name'
  | 'change-visibility'
  | 'change-category'
  | 'none';

export type JoinLinkUpdatableModalType =
  | 'create-link'
  | 'update-link'
  | 'delete-link'
  | 'none';
