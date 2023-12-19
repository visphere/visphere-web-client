/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GuildProfileImageDetailsResDto } from '~/settings-mod/model/guild-profile.model';
import {
  MessageWithResourcePathResDto,
  UpdateProfileColorReqDto,
} from '~/settings-mod/model/profile-settings.module';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class GuildProfileHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getGuildProfileImageDetails$(
    guildId: number
  ): Observable<GuildProfileImageDetailsResDto> {
    return this._httpClient.get<GuildProfileImageDetailsResDto>(
      `${this._infraApiPath}/api/v1/multimedia/profile/image/guild/${guildId}/details`
    );
  }

  updateGuildProfileColor$(
    guildId: number,
    reqDto: UpdateProfileColorReqDto
  ): Observable<MessageWithResourcePathResDto> {
    return this._httpClient.patch<MessageWithResourcePathResDto>(
      `${this._infraApiPath}/api/v1/multimedia/profile/color/guild/${guildId}`,
      reqDto
    );
  }

  updateGuildProfileImageToCustom$(
    guildId: number,
    customImage: File
  ): Observable<MessageWithResourcePathResDto> {
    const formData = new FormData();
    formData.append('image', customImage);
    return this._httpClient.post<MessageWithResourcePathResDto>(
      `${this._infraApiPath}/api/v1/multimedia/profile/image/guild/${guildId}/custom`,
      formData
    );
  }

  deleteCustomGuildProfileImage$(
    guildId: number
  ): Observable<MessageWithResourcePathResDto> {
    return this._httpClient.delete<MessageWithResourcePathResDto>(
      `${this._infraApiPath}/api/v1/multimedia/profile/image/guild/${guildId}`
    );
  }
}
