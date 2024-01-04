/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { actionCloseModal } from '~/client-mod/store/actions';
import { selectIsAddGuildModalOpen } from '~/client-mod/store/selectors';
import { CreateOrJoinGuildModalMode } from '~/client-mod/types/modal-mode.type';
import { ClientReducer } from '~/client-mod/types/ngx-store.type';

@Component({
  selector: 'vsph-create-or-join-sphere-modal',
  templateUrl: './create-or-join-sphere-modal.component.html',
})
export class CreateOrJoinSphereModalComponent {
  isModalOpen$ = this._store.select(selectIsAddGuildModalOpen);
  currentMode$ = this._guildService.createGuildModalMode$;
  isLoading$ = this._guildService.isLoading$;

  readonly defaultPrefix = 'vsph.clientCommon.client.modals';

  constructor(
    private readonly _store: Store<ClientReducer>,
    private readonly _guildService: GuildService
  ) {}

  handleEmitOnClose(): void {
    this._store.dispatch(actionCloseModal());
    this.handleChangeModalMode('create');
  }

  handleChangeModalMode(mode: CreateOrJoinGuildModalMode): void {
    this._guildService.setModalMode(mode);
  }
}
