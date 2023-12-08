/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { UserSettings } from './identity.model';

export type LoggedUser = {
  fullName: string;
  profileUrl: string;
  profileColor: string;
  settings: UserSettings;
};
