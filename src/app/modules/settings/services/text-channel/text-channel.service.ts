/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  ReplaySubject,
  Subject,
  catchError,
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { TextChannelDetailsResDto } from '~/settings-mod/model/guild-management.model';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractGuildManagementProvider } from '../abstract-guild-management.provider';
import { GuildManagementHttpClientService } from '../guild-management-http-client/guild-management-http-client.service';

@Injectable()
export class TextChannelService extends AbstractGuildManagementProvider {
  private _textChannelDetails$ = new Subject<TextChannelDetailsResDto>();
  private _textChannelId$ = new ReplaySubject<number>(1);

  constructor(
    _store: Store<SharedReducer>,
    private readonly _guildManagementHttpClientService: GuildManagementHttpClientService
  ) {
    super(_store);
  }

  fetchTextChannelDetails$(
    route: ActivatedRoute
  ): Observable<TextChannelDetailsResDto> {
    return combineLatest([route.paramMap, this._onChangeObserver$]).pipe(
      tap(() => this.setFetching(true)),
      distinctUntilChanged(),
      map(([paramMap]) => Number(paramMap.get('textChannelId'))),
      filter(textChannelId => !!textChannelId),
      switchMap(textChannelId => {
        this._textChannelId$.next(textChannelId);
        return this._guildManagementHttpClientService.getTextChannelDetails$(
          textChannelId
        );
      }),
      tap(textChannelDetails => {
        this._textChannelDetails$.next(textChannelDetails);
        this.setFetching(false);
      }),
      catchError(err => {
        this.setFetching(false);
        return throwError(() => err);
      })
    );
  }

  updateTextChannel$(
    textChannelId: number,
    name: string
  ): Observable<BaseMessageModel> {
    return this.performAction$(
      this._guildManagementHttpClientService.updateTextChannel$(textChannelId, {
        name,
      })
    );
  }

  deleteTextChannel$(textChannelId: number): Observable<BaseMessageModel> {
    return this.performAction$(
      this._guildManagementHttpClientService.deleteTextChannel$(textChannelId)
    );
  }

  get textChannelDetails$(): Observable<TextChannelDetailsResDto> {
    return this._textChannelDetails$.asObservable();
  }
  get textChannelId$(): Observable<number> {
    return this._textChannelId$.asObservable();
  }
}
