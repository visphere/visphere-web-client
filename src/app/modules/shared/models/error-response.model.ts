/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type BaseErrorModel = {
  timestamp: string;
  status: number;
  path: string;
  method: string;
};

export type MessageErrorModel = BaseErrorModel & {
  message: string;
};

export type MultiFieldsErrorModel = BaseErrorModel & {
  errors: {
    [key: string]: string;
  };
};
