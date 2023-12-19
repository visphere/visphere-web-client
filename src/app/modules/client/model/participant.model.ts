/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type GuildParticipant = {
  id: number;
  fullName: string;
  profileImageUrl: string;
};

export type GuildParticipantsResDto = {
  guildId: number;
  owner: GuildParticipant;
  members: GuildParticipant[];
};

export type GuildParticipantDetailsResDto = GuildParticipant & {
  username: string;
  joinDate: string;
  memberSinceDate: string;
  profileColor: string;
  guildProfileImageUrl: string;
  isOwner: boolean;
  isLoggedUser: boolean;
};

export type DevastateDetails = {
  id: number;
  name: string;
};
