/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateGuildJoinLinkReqDto,
  GuildJoinLink,
  GuildJoinLinkDetails,
  UpdateGuildJoinLinkReqDto,
} from '~/settings-mod/model/guild-join-links.model';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';
import { SpinnerListElementType } from '~/shared-mod/types/spinner-list-element.type';

@Injectable({ providedIn: 'root' })
export class GuildJoinLinksHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getAllGuildJoinLinks$(guildId: number): Observable<GuildJoinLink[]> {
    return this._httpClient.get<GuildJoinLink[]>(
      `${this._infraApiPath}/api/v1/sphere/link/guild/${guildId}/all`
    );
  }

  getAllExpirationTimestamps$(): Observable<SpinnerListElementType[]> {
    return this._httpClient.get<SpinnerListElementType[]>(
      `${this._infraApiPath}/api/v1/sphere/link/expirations/timestamps/all`
    );
  }

  getGuildJoinLinkDetails$(linkId: number): Observable<GuildJoinLinkDetails> {
    return this._httpClient.get<GuildJoinLinkDetails>(
      `${this._infraApiPath}/api/v1/sphere/link/${linkId}`
    );
  }

  createGuildJoinLink$(
    guildId: number,
    reqDto: CreateGuildJoinLinkReqDto
  ): Observable<BaseMessageModel> {
    return this._httpClient.post<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/sphere/link/guild/${guildId}`,
      reqDto
    );
  }

  updateGuildJoinLink$(
    linkId: number,
    reqDto: UpdateGuildJoinLinkReqDto
  ): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/sphere/link/${linkId}`,
      reqDto
    );
  }

  updateGuildJoinLinkActivity$(
    linkId: number,
    active: boolean
  ): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/sphere/link/${linkId}/activity`,
      null,
      { params: { active } }
    );
  }

  deleteGuildJoinLink$(linkId: number): Observable<BaseMessageModel> {
    return this._httpClient.delete<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/sphere/link/${linkId}`
    );
  }
}
