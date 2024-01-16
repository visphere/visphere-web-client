/*
 * Copyright (c) 2024 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ElementRef, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  filter,
  first,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
  BlobFile,
  MessagePayloadResDto,
} from '~/client-mod/model/message.model';
import { MessageLoadingStateType } from '~/client-mod/types/loading-state.type';
import { ClientReducer } from '~/client-mod/types/ngx-store.type';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractLoadableProvider } from '~/shared-mod/services/abstract-loadable-provider';
import { actionAddSnackbar } from '~/shared-mod/store/actions';
import { selectLoggedUser } from '~/shared-mod/store/selectors';
import { MessagesHttpClientService } from '../messages-http-client/messages-http-client.service';
import { WsService } from '../ws/ws.service';

@Injectable()
export class MessagesService extends AbstractLoadableProvider {
  private readonly _size = 50;

  private _offset = 0;
  private _nextPagination = '';
  private _paginationEnd = false;
  private _isNonLocked = true;
  private _infiniteScrollRef?: ElementRef;

  private _onNextOffset$ = new BehaviorSubject<null>(null);
  private _isPaginationEnd$ = new BehaviorSubject<boolean>(false);
  private _activeLoading$ = new BehaviorSubject<MessageLoadingStateType>(
    'none'
  );

  constructor(
    private readonly _messagesHttpClientService: MessagesHttpClientService,
    private readonly _wsService: WsService,
    private readonly _store: Store<ClientReducer>
  ) {
    super();
  }

  setInfiniteScrollRef(inititeScrollRef: ElementRef | undefined): void {
    this._infiniteScrollRef = inititeScrollRef;
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
      map(({ messages }) => messages),
      catchError(() => [])
    );
  }

  sendVariousMessage$(
    message: string,
    blobFiles: BlobFile[]
  ): Observable<null> {
    if (blobFiles.length !== 0) {
      return this.sendMessagesWithFiles$(message, blobFiles);
    }
    return this._wsService.sendMessage$(message);
  }

  sendMessagesWithFiles$(
    message: string,
    blobFiles: BlobFile[]
  ): Observable<null> {
    return of(null).pipe(
      tap(() => this._activeLoading$.next('sending')),
      switchMap(() =>
        combineLatest([
          this._store.select(selectLoggedUser),
          this._wsService.textChannelId$,
        ])
      ),
      switchMap(([loggedUser, textChannelId]) =>
        this._messagesHttpClientService.sendMessageWithFiles$(
          textChannelId,
          blobFiles,
          {
            fullName: loggedUser!.fullName,
            profileImageUrl: loggedUser!.profileUrl,
            message,
          }
        )
      ),
      first(),
      map(() => {
        this._activeLoading$.next('none');
        return null;
      }),
      catchError(err => {
        this._activeLoading$.next('none');
        return throwError(() => err);
      })
    );
  }

  deleteMessage$(
    messageId: string,
    authorId: number
  ): Observable<BaseMessageModel> {
    return of(null).pipe(
      tap(() => this._activeLoading$.next('deleting')),
      switchMap(() => this._wsService.textChannelId$),
      switchMap(textChannelId =>
        this._messagesHttpClientService.deleteMessage$(
          messageId,
          authorId,
          textChannelId
        )
      ),
      first(),
      tap(({ message }) => {
        this._activeLoading$.next('none');
        this._store.dispatch(
          actionAddSnackbar({
            content: {
              placeholder: message,
              omitTransformation: true,
            },
            severity: 'success',
          })
        );
      }),
      catchError(err => {
        this._activeLoading$.next('none');
        return throwError(() => err);
      })
    );
  }

  handleKeyPressAction(
    userMessage: string,
    appendFiles: BlobFile[],
    event: KeyboardEvent,
    sendMessageCallback: () => void
  ): void {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      (userMessage || appendFiles.length !== 0) &&
      event.key
    ) {
      event.preventDefault();
      if (this._infiniteScrollRef) {
        this._infiniteScrollRef.nativeElement.scrollTop = 0;
      }
      sendMessageCallback();
    }
  }

  increaseOffset(): void {
    this._onNextOffset$.next(null);
  }

  get isPaginationEnd$(): Observable<boolean> {
    return this._isPaginationEnd$.asObservable();
  }
  get activeLoading$(): Observable<MessageLoadingStateType> {
    return this._activeLoading$.asObservable();
  }
}
