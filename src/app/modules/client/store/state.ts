/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ClientModal } from '../types/modal-mode.type';

export interface ClientStoreState {
  activeModal: ClientModal;
  selectedGuildId: number | undefined;
  selectedChannelId: number | undefined;
}

export const clientStoreState: ClientStoreState = {
  activeModal: 'none',
  selectedGuildId: undefined,
  selectedChannelId: undefined,
};
