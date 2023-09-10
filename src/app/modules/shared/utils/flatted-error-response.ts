/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
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
