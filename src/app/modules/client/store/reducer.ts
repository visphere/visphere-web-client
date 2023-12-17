/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Action, createReducer, on } from '@ngrx/store';
import { ClientModal } from '../types/modal-mode.type';
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
