/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';

export type ActivateAccountFormModel = {
  token: string;
};

export type ActivateAccountReqDtoModel = {
  emailAddress: string;
};

export type ActivateAccountResDtoModel = BaseMessageModel & {
  enabledMfa: boolean;
};
