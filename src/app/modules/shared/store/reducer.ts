/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: reducer.ts
 *   Created at: 2023-08-22, 19:57:14
 *   Last updated at: 2023-08-22, 19:57:14
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */
import { Action, createReducer, on } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import * as NgrxAction from './actions';
import { SharedStoreState, sharedStoreState } from './state';

const _reducer = createReducer(
  sharedStoreState,
  on(NgrxAction.__addSnackbar, (state, action) => {
    const { header, content, severity } = action;
    return {
      ...state,
      snackbarStack: [
        { id: uuidv4(), header, content, severity },
        ...state.snackbarStack,
      ],
    };
  }),
  on(NgrxAction.__removeSnackbar, (state, action) => ({
    ...state,
    snackbarStack: action.id
      ? state.snackbarStack.filter(({ id }) => id !== action.id)
      : state.snackbarStack.slice(0, -1),
  }))
);

export const sharedReduxStore = {
  reducerName: 'sharedStoreReducer' as const,
  reducerFunction: function reducer(
    state: SharedStoreState,
    action: Action
  ): SharedStoreState {
    return _reducer(state, action);
  },
};
