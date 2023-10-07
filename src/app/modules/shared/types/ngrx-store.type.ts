/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { sharedReduxStore } from '../store/reducer';
import { SharedStoreState } from '../store/state';

export type SharedReducer = {
  [sharedReduxStore.reducerName]: SharedStoreState;
};
