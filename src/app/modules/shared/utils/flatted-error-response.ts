/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: flatted-error-response.ts
 *   Created at: 2023-09-05, 10:25:42
 *   Last updated at: 2023-09-05, 10:25:42
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
import { MultiFieldsErrorModel } from '../models/error-response.model';

export const flattedErrorResponse = (
  res: object
): {
  placeholder: string;
  i18nPrefix?: string;
  omitTransformation?: boolean;
} => {
  const parsed = res as MultiFieldsErrorModel;
  const commonError = {
    i18nPrefix: 'msph.common.utils.',
    placeholder: 'unknowError',
  };
  if (!parsed.errors) {
    return commonError;
  }
  const keys = Object.keys(parsed.errors);
  if (keys.length !== 0) {
    return { placeholder: parsed.errors[keys[0]], omitTransformation: true };
  }
  return commonError;
};
