/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Action, createReducer, on } from '@ngrx/store';
import { ClientModal, MergedModal } from '../types/modal-mode.type';
import * as NgrxAction from './actions';
import { ClientStoreState, clientStoreState } from './state';

const _reducer = createReducer(
  clientStoreState,
  on(NgrxAction.__openSelectedModal, (state, action) => ({
    ...state,
    activeModal: action.modal,
  })),
  on(NgrxAction.__closeModal, state => ({
    ...state,
    activeModal: 'none' as ClientModal,
  })),
  on(NgrxAction.__setSelectedChannelId, (state, action) => ({
    ...state,
    selectedChannelId: action.channelId,
  })),
  on(NgrxAction.__openDevastateMemberModal, (state, action) => ({
    ...state,
    activeModal: action.modal,
    devastateDetails: {
      ...state.devastateDetails,
      id: action.id,
      name: action.name,
    },
  })),
  on(NgrxAction.__closeDevastateMemberModal, state => ({
    ...state,
    activeModal: 'none' as MergedModal,
    devastateDetails: undefined,
  })),
  on(NgrxAction.__setViewedImageDetails, (state, action) => ({
    ...state,
    imageViewerDetails: action.details,
  })),
  on(NgrxAction.__setDeletingMessageContent, (state, action) => ({
    ...state,
    deletingMessageContent: action.messageContent,
  }))
);

export const clientReduxStore = {
  reducerName: 'clientStoreReducer' as const,
  reducerFunction: function reducer(
    state: ClientStoreState,
    action: Action
  ): ClientStoreState {
    return _reducer(state, action);
  },
};
