/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import {
  MessageErrorModel,
  MultiFieldsErrorModel,
} from '../models/error-response.model';

export const flattedErrorResponse = (
  res: object
): {
  placeholder: string;
  i18nPrefix?: string;
  omitTransformation?: boolean;
} => {
  const parsed = res as MultiFieldsErrorModel;
  const commonError = {
    i18nPrefix: 'vsph.common.utils.',
    placeholder: 'unknowError',
  };
  if (!parsed.errors) {
    const singleField = res as MessageErrorModel;
    if (singleField.message) {
      return getOmittedTransformationObj(singleField.message);
    }
    return commonError;
  }
  const keys = Object.keys(parsed.errors);
  if (keys.length !== 0) {
    return getOmittedTransformationObj(parsed.errors[keys[0]]);
  }
  return commonError;
};

const getOmittedTransformationObj = (
  message: string
): {
  placeholder: string;
  omitTransformation: boolean;
} => ({
  placeholder: message,
  omitTransformation: true,
});
