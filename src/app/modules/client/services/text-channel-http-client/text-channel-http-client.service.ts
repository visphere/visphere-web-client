/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateTextChannelReqDto,
  TextChannelDetailsResDto,
  TextChannelResDto,
} from '~/client-mod/model/text-channel.model';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class TextChannelHttpClientService extends AbstractHttpProvider {
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

  getGuildTextChannels$(guildId: number): Observable<TextChannelResDto[]> {
    return this._httpClient.get<TextChannelResDto[]>(
      `${this._infraApiPath}/api/v1/sphere/text-channel/guild/${guildId}`
    );
  }

  createTextChannel$(
    guildId: number,
    reqDto: CreateTextChannelReqDto
  ): Observable<BaseMessageModel> {
    return this._httpClient.post<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/sphere/text-channel/guild/${guildId}`,
      reqDto
    );
  }
}
