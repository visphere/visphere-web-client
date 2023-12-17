/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { clientReduxStore } from '../store/reducer';
import { ClientStoreState } from '../store/state';

export type ClientReducer = {
  [clientReduxStore.reducerName]: ClientStoreState;
};
