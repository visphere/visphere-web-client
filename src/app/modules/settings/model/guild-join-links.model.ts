/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type GuildJoinLink = {
  id: number;
  name: string;
  joinLinkUrl: string;
  token: string;
  expiredAt: string | null;
  active: boolean;
  usagesCount: number;
};

export type GuildJoinLinkDetails = {
  id: number;
  name: string;
};

export type CreateGuildJoinLinkReqDto = {
  name: string;
  expiredAfter: string;
};

export type UpdateGuildJoinLinkReqDto = {
  name: string;
};

export type UpdateJoinLinkPayload = {
  linkId: number;
  reqDto: CreateGuildJoinLinkReqDto;
};
