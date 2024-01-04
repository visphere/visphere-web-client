/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Action, createReducer, on } from '@ngrx/store';
import { ClientModal, MergedModal } from '../types/modal-mode.type';
import {
  actionCloseDevastateMemberModal,
  actionCloseModal,
  actionOpenDevastateMemberModal,
  actionOpenSelectedModal,
  actionSetDeletingMessageContent,
  actionSetSelectedChannelId,
  actionSetViewedImageDetails,
} from './actions';
import { ClientStoreState, clientStoreState } from './state';

const _reducer = createReducer(
  clientStoreState,
  on(actionOpenSelectedModal, (state, action) => ({
    ...state,
    activeModal: action.modal,
  })),
  on(actionCloseModal, state => ({
    ...state,
    activeModal: 'none' as ClientModal,
  })),
  on(actionSetSelectedChannelId, (state, action) => ({
    ...state,
    selectedChannelId: action.channelId,
  })),
  on(actionOpenDevastateMemberModal, (state, action) => ({
    ...state,
    activeModal: action.modal,
    devastateDetails: {
      ...state.devastateDetails,
      id: action.id,
      name: action.name,
    },
  })),
  on(actionCloseDevastateMemberModal, state => ({
    ...state,
    activeModal: 'none' as MergedModal,
    devastateDetails: undefined,
  })),
  on(actionSetViewedImageDetails, (state, action) => ({
    ...state,
    imageViewerDetails: action.details,
  })),
  on(actionSetDeletingMessageContent, (state, action) => ({
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
