/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GuildBannedUser } from '~/settings-mod/model/guild-bans.model';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class GuildBansHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getAllBannedUsers$(guildId: number): Observable<GuildBannedUser[]> {
    return this._httpClient.get<GuildBannedUser[]>(
      `${this._infraApiPath}/api/v1/sphere/participant/guild/${guildId}/banned/all`
    );
  }

  unbanUser$(guildId: number, userId: number): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/sphere/participant/guild/${guildId}/unban/user/${userId}`,
      null
    );
  }
}
