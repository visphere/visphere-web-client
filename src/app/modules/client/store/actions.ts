/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { createAction, props } from '@ngrx/store';
import { ClientModal, DevastateMemberModal } from '../types/modal-mode.type';

enum Action {
  OPEN_SELECTED_MODAL = '[CLIENT] OPEN SELECTED MODAL',
  CLOSE_MODAL = '[CLIENT] CLOSE MODAL',
  SET_SELECTED_GUILD_ID = '[CLIENT] SET SELECTED GUILD ID',
  SET_SELECTED_CHANNEL_ID = '[CLIENT] SET SELECTED CHANNEL ID',
  OPEN_DEVASTATE_MEMBER_MODAL = '[CLIENT] OPEN DEVASTATE MEMBER MODAL',
  CLOSE_DEVASTATE_MEMBER_MODAL = '[CLIENT] CLOSE DEVASTATE MEMBER MODAL',
}

export const __openSelectedModal = createAction(
  Action.OPEN_SELECTED_MODAL,
  props<{ modal: ClientModal }>()
);

export const __closeModal = createAction(Action.CLOSE_MODAL);

export const __setSelectedChannelId = createAction(
  Action.SET_SELECTED_CHANNEL_ID,
  props<{ channelId: number | undefined }>()
);

export const __openDevastateMemberModal = createAction(
  Action.OPEN_DEVASTATE_MEMBER_MODAL,
  props<{
    modal: DevastateMemberModal;
    id: number;
    name: string;
  }>()
);

export const __closeDevastateMemberModal = createAction(
  Action.CLOSE_DEVASTATE_MEMBER_MODAL
);
