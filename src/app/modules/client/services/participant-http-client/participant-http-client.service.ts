/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GuildParticipantDetailsResDto,
  GuildParticipantsResDto,
} from '~/client-mod/model/participant.model';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { PasswordConfirmationReqDto } from '~/shared-mod/models/password-confirmation.model';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class ParticipantHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getGuildParticipants$(guildId: number): Observable<GuildParticipantsResDto> {
    return this._httpClient.get<GuildParticipantsResDto>(
      `${this._infraApiPath}/api/v1/sphere/participant/guild/${guildId}/all`
    );
  }

  getGuildParticipantDetails$(
    guildId: number,
    userId: number
  ): Observable<GuildParticipantDetailsResDto> {
    return this._httpClient.get<GuildParticipantDetailsResDto>(
      `${this._infraApiPath}/api/v1/sphere/participant/guild/${guildId}/user/${userId}/details`
    );
  }

  leaveGuild$(
    guildId: number,
    deleteAllMessages: boolean
  ): Observable<BaseMessageModel> {
    return this._httpClient.delete<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/sphere/participant/guild/${guildId}/leave`,
      { params: { deleteAllMessages } }
    );
  }

  kickFromGuild$(
    guildId: number,
    userId: number,
    deleteAllMessages: boolean
  ): Observable<BaseMessageModel> {
    return this._httpClient.delete<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/sphere/participant/guild/${guildId}/kick/user/${userId}`,
      { params: { deleteAllMessages } }
    );
  }

  banFromGuild$(
    guildId: number,
    userId: number,
    deleteAllMessages: boolean
  ): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/sphere/participant/guild/${guildId}/ban/user/${userId}`,
      null,
      { params: { deleteAllMessages } }
    );
  }

  delegateGuildProprietyToUser$(
    guildId: number,
    userId: number,
    reqDto: PasswordConfirmationReqDto
  ): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/sphere/participant/guild/${guildId}/delegate/user/${userId}`,
      reqDto
    );
  }
}
