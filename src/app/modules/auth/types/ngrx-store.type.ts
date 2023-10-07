/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { authReduxStore } from '../store/reducer';
import { AuthStoreState } from '../store/state';

export type AuthReducer = {
  [authReduxStore.reducerName]: AuthStoreState;
};
