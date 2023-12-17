/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractWsWebhookProvider } from '~/shared-mod/services/abstract-ws-webhook.provider';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { TextChannelHttpClientService } from '../text-channel-http-client/text-channel-http-client.service';

@Injectable()
export class TextChannelService extends AbstractWsWebhookProvider<SharedReducer> {
  constructor(
    private readonly _textChannelHttpClientService: TextChannelHttpClientService,
    _store: Store<SharedReducer>
  ) {
    super(_store);
  }

  createTextChannel$(
    guildId: number,
    textChannelName: string
  ): Observable<BaseMessageModel> {
    this.setLoading(true);
    return this._textChannelHttpClientService
      .createTextChannel$(guildId, { name: textChannelName })
      .pipe(
        tap(({ message }) => {
          this.setLoading(false);
          this.showSuccessSnackbar(message);
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }
}
