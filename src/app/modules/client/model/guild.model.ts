/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
export type UserGuildResDto = {
  id: number;
  name: string;
  profileUrl: string;
};

export type CreateGuildForm = {
  name: string;
  isPrivate: boolean;
};

export type CreateGuildReqDto = CreateGuildForm & {
  category: string;
};

export type AddGuildResDto = {
  id: number;
  message: string;
};

export type SphereGuildCategory = {
  id: string;
  name: string;
};

export type GuildDetailsResDto = {
  id: number;
  name: string;
  category: string;
  profileColor: string;
  isPrivate: boolean;
  ownerId: number;
  isLoggedUserIsOwner: boolean;
};
