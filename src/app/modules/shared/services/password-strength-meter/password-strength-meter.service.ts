/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
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
