/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: password-strength-meter.service.ts
 *   Created at: 2023-08-06, 18:55:39
 *   Last updated at: 2023-08-11, 00:09:56
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This is a project
 * completing a engineers degree in computer science at Silesian University of Technology.
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

import { APP_INITIALIZER, Injectable } from '@angular/core';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';

@Injectable({ providedIn: 'root' })
export class PasswordStrengthMeterService {
  initMeter(): void {
    zxcvbnOptions.setOptions({});
  }

  calcPasswordStrength(password: string): number {
    const result = zxcvbn(password);
    return (100 * result.score) / 4;
  }
}

function passwordStrengthMeteritFactory(
  passwordStrengthMeter: PasswordStrengthMeterService
): () => void {
  return () => passwordStrengthMeter.initMeter();
}

export const passwordStrengthMeterInitializer = {
  provide: APP_INITIALIZER,
  useFactory: passwordStrengthMeteritFactory,
  deps: [PasswordStrengthMeterService],
  multi: true,
};
