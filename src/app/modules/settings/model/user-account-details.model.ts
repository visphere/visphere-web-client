/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ExtendedOAuth2Supplier } from '~/shared-mod/types/oauth2-supplier.type';

export type UserAccountDetailsResDto = {
  firstName: string;
  lastName: string;
  username: string;
  emailAddress: string;
  secondEmailAddress: string;
  externalOAuth2Supplier: boolean;
  crendetialsSupplier: ExtendedOAuth2Supplier;
  birthDate: string;
  joinDate: string;
  mfaEnabled: boolean;
  mfaSetup: boolean;
};

export type UserAccountDetailsModel = UserAccountDetailsResDto & {
  fullName: string;
  profileUrl: string;
  profileColor: string;
};
