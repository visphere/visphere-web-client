/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';

export type ActivateAccountFormModel = {
  token: string;
};

export type ActivateAccountReqDtoModel = {
  emailAddress: string;
};

export interface ActivateAccountResDtoModel extends BaseMessageModel {
  enabledMfa: boolean;
}
