/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type JoiningGuildDetailsResDto = {
  id: number;
  name: string;
  category: string;
  participants: number;
  private: boolean;
  profileColor: string;
  profileImageUrl: string;
};

export type JoinGuildResDto = {
  guildId: number;
  message: string;
};
