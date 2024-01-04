/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { FileAttachment, MessagePayloadResDto } from '../model/message.model';
import { DevastateDetails } from '../model/participant.model';
import { MergedModal } from '../types/modal-mode.type';

export interface ClientStoreState {
  activeModal: MergedModal;
  selectedGuildId: number | undefined;
  selectedChannelId: number | undefined;
  devastateDetails: DevastateDetails | undefined;
  imageViewerDetails: FileAttachment | undefined;
  deletingMessageContent: MessagePayloadResDto | undefined;
}

export const clientStoreState: ClientStoreState = {
  activeModal: 'none',
  selectedGuildId: undefined,
  selectedChannelId: undefined,
  devastateDetails: undefined,
  imageViewerDetails: undefined,
  deletingMessageContent: undefined,
};
