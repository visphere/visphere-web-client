/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { clientReduxStore } from './reducer';
import { ClientStoreState } from './state';

export const selectClientState = createFeatureSelector<ClientStoreState>(
  clientReduxStore.reducerName
);

export const selectIsAddGuildModalOpen = createSelector(
  selectClientState,
  ({ activeModal }) => activeModal === 'add-sphere'
);

export const selectIsAddTextChannelModalOpen = createSelector(
  selectClientState,
  ({ activeModal }) => activeModal === 'add-text-channel'
);

export const selectSelectedGuildId = createSelector(
  selectClientState,
  ({ selectedGuildId }) => selectedGuildId
);

export const selectSelectedChannelId = createSelector(
  selectClientState,
  ({ selectedChannelId }) => selectedChannelId
);

export const selectDevastateDetails = createSelector(
  selectClientState,
  ({ devastateDetails }) => devastateDetails
);

export const selectActiveModal = createSelector(
  selectClientState,
  ({ activeModal }) => activeModal
);

export const selectImageViewerDetails = createSelector(
  selectClientState,
  ({ imageViewerDetails }) => imageViewerDetails
);

export const selectDeletingMessageContent = createSelector(
  selectClientState,
  ({ deletingMessageContent }) => deletingMessageContent
);
