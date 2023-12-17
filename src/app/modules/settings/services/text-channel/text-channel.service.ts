/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractGuildManagementProvider } from '../abstract-guild-management.provider';
import { GuildManagementHttpClientService } from '../guild-management-http-client/guild-management-http-client.service';

@Injectable()
export class TextChannelService extends AbstractGuildManagementProvider {
  constructor(
    _store: Store<SharedReducer>,
    private readonly _guildManagementHttpClientService: GuildManagementHttpClientService
  ) {
    super(_store);
  }

  deleteTextChannel$(textChannelId: number): Observable<BaseMessageModel> {
    this.setLoading(true);
    return this.performAction$(
      this._guildManagementHttpClientService.deleteTextChannel$(textChannelId)
    );
  }
}
