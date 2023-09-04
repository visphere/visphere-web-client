/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: snackbar.type.ts
 *   Created at: 2023-08-23, 01:14:35
 *   Last updated at: 2023-08-23, 01:14:35
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
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
  parameters?: { [key: string]: any };
};

export type Snackbar = {
  id: string;
  header?: SnackbarI18n;
  content: SnackbarI18n;
  severity?: Severity;
};
