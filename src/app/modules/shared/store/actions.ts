/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: actions.ts
 *   Created at: 2023-08-22, 19:57:07
 *   Last updated at: 2023-08-22, 19:57:07
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
import { createAction, props } from '@ngrx/store';
import { Severity, SnackbarI18n } from '~/shared-mod/types/snackbar.type';

const ADD_SNACKBAR = '[SHARED] ADD SNACKBAR' as const;
const REMOVE_SNACKBAR = '[SHARED] REMOVE SNACKBAR' as const;

export const __addSnackbar = createAction(
  ADD_SNACKBAR,
  props<{ header?: SnackbarI18n; content: SnackbarI18n; severity?: Severity }>()
);

export const __removeSnackbar = createAction(
  REMOVE_SNACKBAR,
  props<{ id?: string }>()
);
