/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { UserSettings } from './identity.model';

export type LoggedUser = {
  id: number;
  fullName: string;
  username: string;
  profileUrl: string;
  profileColor: string;
  joinDate: string;
  credentialsSupplier: string;
  imageFromExternalProvider: boolean;
  isMfaSetup: boolean;
  settings: UserSettings;
};

export type DisabledAccount = {
  accessToken: string;
  modalIsOpen: boolean;
};
