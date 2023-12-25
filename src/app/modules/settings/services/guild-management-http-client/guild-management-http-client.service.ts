/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  EditGuildReqDto,
  EditTextChannelReqDto,
  GuildOwnerDetailsResDto,
  GuildOwnerOverviewResDto,
  TextChannelDetailsResDto,
  UpdateGuildVisibilityReqDto,
} from '~/settings-mod/model/guild-management.model';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { PasswordConfirmationReqDto } from '~/shared-mod/models/password-confirmation.model';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class GuildManagementHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getTextChannelDetails$(
    textChannelId: number
  ): Observable<TextChannelDetailsResDto> {
    return this._httpClient.get<TextChannelDetailsResDto>(
      `${this._infraApiPath}/api/v1/sphere/text-channel/${textChannelId}/details`
    );
  }

  updateTextChannel$(
    textChannelId: number,
    reqDto: EditTextChannelReqDto
  ): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/sphere/text-channel/${textChannelId}`,
      reqDto
    );
  }

  deleteTextChannel$(textChannelId: number): Observable<BaseMessageModel> {
    return this._httpClient.delete<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/sphere/text-channel/${textChannelId}`
    );
  }

  getGuildOwnerDetails$(guildId: number): Observable<GuildOwnerDetailsResDto> {
    return this._httpClient.get<GuildOwnerDetailsResDto>(
      `${this._infraApiPath}/api/v1/sphere/guild/${guildId}/owner/details`
    );
  }
  getGuildOwnerOverview$(
    guildId: number
  ): Observable<GuildOwnerOverviewResDto> {
    return this._httpClient.get<GuildOwnerOverviewResDto>(
      `${this._infraApiPath}/api/v1/sphere/guild/${guildId}/owner/overview`
    );
  }

  updateGuild$(
    guildId: number,
    reqDto: EditGuildReqDto
  ): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/sphere/guild/${guildId}`,
      reqDto
    );
  }

  updateGuildVisibility$(
    guildId: number,
    reqDto: UpdateGuildVisibilityReqDto
  ): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/sphere/guild/${guildId}/visibility`,
      reqDto
    );
  }

  deleteGuild$(
    guildId: number,
    reqDto: PasswordConfirmationReqDto
  ): Observable<BaseMessageModel> {
    return this._httpClient.delete<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/sphere/guild/${guildId}`,
      { body: reqDto }
    );
  }
}
