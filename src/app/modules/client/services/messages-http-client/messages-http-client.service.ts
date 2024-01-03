/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessagesResDto } from '~/client-mod/model/message.model';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class MessagesHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getTextChannelMessagesWithOffset$(
    offset: number,
    size: number,
    nextPage: string,
    textChannelId: number
  ): Observable<MessagesResDto> {
    return this._httpClient.get<MessagesResDto>(
      `${this._infraApiPath}/api/v1/chat/message/textchannel/${textChannelId}/all`,
      { params: { offset, nextPage, size } }
    );
  }
}
