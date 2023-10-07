/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type Severity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export type SnackbarI18n = {
  placeholder: string;
  omitTransformation?: boolean;
  i18nPrefix?: string;
  parameters?: { [key: string]: any };
};

export type Snackbar = {
  id: string;
  header?: SnackbarI18n;
  content: SnackbarI18n;
  severity?: Severity;
};
