/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { OAuth2Supplier } from '~/shared-mod/types/oauth2-supplier.type';

export type UserDataFillFormResDto = {
  firstName: string;
  lastName: string;
  username: string;
  profileImageUrl: string;
  supplier: OAuth2Supplier;
  message: string;
};

export type UpdateUserAccountDataReqDto = {
  username: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  allowNotifs: boolean;
};

export type UpdateUserAccountDataReqFormModel = {
  username: string;
  firstName: string;
  lastName: string;
  birthDate: { day: number; month: number; year: number };
  allowNotifs: boolean;
};
