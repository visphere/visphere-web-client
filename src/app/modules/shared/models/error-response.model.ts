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

export interface MessageErrorModel extends BaseErrorModel {
  message: string;
}

export interface MultiFieldsErrorModel extends BaseErrorModel {
  errors: {
    [key: string]: string;
  };
}
