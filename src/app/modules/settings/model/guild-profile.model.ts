/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type GuildProfileImageDetailsResDto = {
  guildName: string;
  createdDate: string;
  profileColor: string;
  profileImageUrl: string;
  imageType: string;
};

export type GuildProfileData = {
  profileImageDetails: GuildProfileImageDetailsResDto;
  availableColors: string[];
};
