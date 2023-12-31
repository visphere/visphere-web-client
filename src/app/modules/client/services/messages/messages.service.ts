/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, filter, map, switchMap, tap } from 'rxjs';
import { MessagePayloadResDto } from '~/client-mod/model/message.model';
import { AbstractLoadableProvider } from '~/shared-mod/services/abstract-loadable-provider';
import { MessagesHttpClientService } from '../messages-http-client/messages-http-client.service';

@Injectable()
export class MessagesService extends AbstractLoadableProvider {
  private readonly _size = 50;

  private _offset = 0;
  private _nextPagination = '';
  private _paginationEnd = false;
  private _isNonLocked = true;

  private _onNextOffset$ = new BehaviorSubject<null>(null);
  private _isPaginationEnd$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly _messagesHttpClientService: MessagesHttpClientService
  ) {
    super();
  }

  resetOffsetOnChangePage$(route$: ActivatedRoute): Observable<null> {
    return route$.paramMap.pipe(
      map(() => {
        this._offset = 0;
        this._isPaginationEnd$.next(false);
        this.setLoading(true);
        this._nextPagination = '';
        this._paginationEnd = false;
        return null;
      })
    );
  }

  fetchMessagesWithOffset$(
    route$: ActivatedRoute
  ): Observable<MessagePayloadResDto[]> {
    return this._onNextOffset$.pipe(
      filter(() => this._isNonLocked),
      tap(() => {
        if (!this._paginationEnd) {
          this.setLoading(true);
          this._isNonLocked = false;
        }
      }),
      filter(() => !this._paginationEnd),
      switchMap(() => route$.paramMap),
      map(paramMap => Number(paramMap.get('textChannelId'))),
      switchMap(textChannelId =>
        this._messagesHttpClientService.getTextChannelMessagesWithOffset$(
          this._offset,
          this._size,
          this._nextPagination,
          textChannelId
        )
      ),
      tap(({ paginationState, paginationEnd }) => {
        this._nextPagination = paginationState;
        this._paginationEnd = paginationEnd;
        if (paginationEnd) {
          this._offset = 0;
        } else {
          this._offset++;
        }
        this._isPaginationEnd$.next(paginationEnd);
        this._isNonLocked = true;
        this.setLoading(false);
      }),
      map(({ messages }) => messages)
    );
  }

  increaseOffset(): void {
    this._onNextOffset$.next(null);
  }

  get isPaginationEnd$(): Observable<boolean> {
    return this._isPaginationEnd$.asObservable();
  }
}
