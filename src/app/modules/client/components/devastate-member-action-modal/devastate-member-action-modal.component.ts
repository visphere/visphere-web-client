/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as NgrxAction_CLN from '~/client-mod/store/actions';
import * as NgrxSelector_CLN from '~/client-mod/store/selectors';
import { DevastateMemberModal } from '~/client-mod/types/modal-mode.type';
import { ClientReducer } from '~/client-mod/types/ngx-store.type';

@Component({
  selector: 'vsph-devastate-member-action-modal',
  templateUrl: './devastate-member-action-modal.component.html',
})
export class DevastateMemberActionModalComponent {
  @Input() i18nPrefix = '';
  @Input() modalType: DevastateMemberModal = 'kick';

  @Output() emitDevastateAction = new EventEmitter<boolean>();

  activeModal$ = this._store.select(NgrxSelector_CLN.selectActiveModal);
  devastateDetails$ = this._store.select(
    NgrxSelector_CLN.selectDevastateDetails
  );

  deleteAllMessages = false;

  readonly defaultPrefix = 'vsph.clientCommon.client.modals';

  constructor(private readonly _store: Store<ClientReducer>) {}

  handleCloseModal(): void {
    this._store.dispatch(NgrxAction_CLN.__closeDevastateMemberModal());
    this.deleteAllMessages = false;
  }
}
