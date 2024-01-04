/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { selectIsAddGuildModalOpen } from '~/client-mod/store/selectors';
import { ClientReducer } from '~/client-mod/types/ngx-store.type';

@Component({
  selector: 'vsph-client-entrypoint-page',
  templateUrl: './client-entry-point-page.component.html',
  providers: [GuildService],
})
export class ClientEntryPointPageComponent {
  isModalOpen$ = this._store.select(selectIsAddGuildModalOpen);

  constructor(private readonly _store: Store<ClientReducer>) {}
}
