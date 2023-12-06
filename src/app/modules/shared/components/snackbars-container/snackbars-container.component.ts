/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { snackbarFadeAndMove } from '~/shared-mod/animations/snackbar.animation';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import * as NgrxSelector_SHA from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

@Component({
  selector: 'vsph-snackbars-container',
  templateUrl: './snackbars-container.component.html',
  animations: [snackbarFadeAndMove],
})
export class SnackbarsContainerComponent {
  snackbarStack$ = this._store.select(NgrxSelector_SHA.selectSnackbarsStack);

  constructor(private readonly _store: Store<SharedReducer>) {}

  handleRemoveSnackbar(id: string) {
    this._store.dispatch(NgrxAction_SHA.__removeSnackbar({ id }));
  }
}
