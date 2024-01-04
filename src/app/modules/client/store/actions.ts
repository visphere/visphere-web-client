/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { createAction, props } from '@ngrx/store';
import { FileAttachment, MessagePayloadResDto } from '../model/message.model';
import { ClientModal, DevastateMemberModal } from '../types/modal-mode.type';

enum Action {
  OPEN_SELECTED_MODAL = '[CLIENT] OPEN SELECTED MODAL',
  CLOSE_MODAL = '[CLIENT] CLOSE MODAL',
  SET_SELECTED_GUILD_ID = '[CLIENT] SET SELECTED GUILD ID',
  SET_SELECTED_CHANNEL_ID = '[CLIENT] SET SELECTED CHANNEL ID',
  OPEN_DEVASTATE_MEMBER_MODAL = '[CLIENT] OPEN DEVASTATE MEMBER MODAL',
  CLOSE_DEVASTATE_MEMBER_MODAL = '[CLIENT] CLOSE DEVASTATE MEMBER MODAL',
  SET_VIEWED_IMAGE_DETAILS = '[CLIENT] SET VIEWED IMAGE DETAILS',
  SET_DELETING_MESSAGE_CONTENT = '[CLIENT] SET DELETING MESSAGE CONTENT',
}

export const actionOpenSelectedModal = createAction(
  Action.OPEN_SELECTED_MODAL,
  props<{ modal: ClientModal }>()
);

export const actionCloseModal = createAction(Action.CLOSE_MODAL);

export const actionSetSelectedChannelId = createAction(
  Action.SET_SELECTED_CHANNEL_ID,
  props<{ channelId: number | undefined }>()
);

export const actionOpenDevastateMemberModal = createAction(
  Action.OPEN_DEVASTATE_MEMBER_MODAL,
  props<{
    modal: DevastateMemberModal;
    id: number;
    name: string;
  }>()
);

export const actionCloseDevastateMemberModal = createAction(
  Action.CLOSE_DEVASTATE_MEMBER_MODAL
);

export const actionSetViewedImageDetails = createAction(
  Action.SET_VIEWED_IMAGE_DETAILS,
  props<{ details: FileAttachment | undefined }>()
);

export const actionSetDeletingMessageContent = createAction(
  Action.SET_DELETING_MESSAGE_CONTENT,
  props<{ messageContent: MessagePayloadResDto | undefined }>()
);
