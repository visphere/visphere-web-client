/*
 * Copyright (c) 2023 by MoonSphere Systems
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
