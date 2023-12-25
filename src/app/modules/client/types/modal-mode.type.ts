/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type CreateOrJoinGuildModalMode = 'create' | 'join';

export type ClientModal = 'add-sphere' | 'add-text-channel';

export type DevastateMemberModal = 'leave' | 'kick' | 'ban' | 'delegate';

export type MergedModal = ClientModal | DevastateMemberModal | 'none';
