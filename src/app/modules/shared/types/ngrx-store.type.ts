/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { sharedReduxStore } from '../store/reducer';
import { SharedStoreState } from '../store/state';

export type SharedReducer = {
  [sharedReduxStore.reducerName]: SharedStoreState;
};
