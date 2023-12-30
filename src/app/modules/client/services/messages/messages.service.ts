/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { MessagePayloadResDto } from '~/client-mod/model/message.model';
import { AbstractLoadableProvider } from '~/shared-mod/services/abstract-loadable-provider';
import { MessagesHttpClientService } from '../messages-http-client/messages-http-client.service';

@Injectable()
export class MessagesService extends AbstractLoadableProvider {
  private readonly _size = 40;

  private _currentOffset$ = new BehaviorSubject<number>(0);

  constructor(
    private readonly _messagesHttpClientService: MessagesHttpClientService
  ) {
    super();
  }

  resetOffsetOnChangePage$(route$: ActivatedRoute): Observable<null> {
    return route$.paramMap.pipe(
      map(() => {
        this._currentOffset$.next(0);
        return null;
      })
    );
  }

  fetchMessagesWithOffset$(
    route$: ActivatedRoute
  ): Observable<MessagePayloadResDto[]> {
    return this._currentOffset$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(offset => combineLatest([route$.paramMap, of(offset)])),
      map(([paramMap, offset]) => ({
        textChannelId: Number(paramMap.get('textChannelId')),
        offset,
      })),
      switchMap(({ textChannelId, offset }) =>
        this._messagesHttpClientService.getTextChannelMessagesWithOffset$(
          offset,
          this._size,
          textChannelId
        )
      ),
      tap(() => {
        this.setLoading(false);
      })
    );
  }
}
