/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  JoinGuildResDto,
  JoiningGuildDetailsResDto,
} from '~/client-mod/model/join-guild.model';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class JoinLinkHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getGuildDetails$(
    identifier: string,
    isPublic: boolean
  ): Observable<JoiningGuildDetailsResDto> {
    return this._httpClient.get<JoiningGuildDetailsResDto>(
      `${this._infraApiPath}/api/v1/sphere/join/${
        isPublic ? 'public/guild' : 'private'
      }/${identifier}${isPublic ? '' : '/guild'}/details`
    );
  }

  joinToGuild$(
    identifier: string,
    isPublic: boolean
  ): Observable<JoinGuildResDto> {
    return this._httpClient.post<JoinGuildResDto>(
      `${this._infraApiPath}/api/v1/sphere/join/${
        isPublic ? 'public/guild' : 'private'
      }/${identifier}`,
      null
    );
  }
}
