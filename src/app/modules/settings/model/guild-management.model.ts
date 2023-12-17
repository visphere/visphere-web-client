/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type EditTextChannelReqDto = {
  name: string;
};

export type EditGuildReqDto = {
  name: string;
  category: string;
};

export type UpdateGuildVisibilityReqDto = {
  isPrivate: boolean;
  unactiveAllPreviousLinks: boolean;
};

export type TextChannelDetailsResDto = {
  name: string;
};

export type GuildDetailsResDto = {
  name: string;
  isPrivate: boolean;
  profileColor: string;
  profileImageUrl: string;
  createdDate: string;
};
