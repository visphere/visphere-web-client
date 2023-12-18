/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  filter,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
  TextChannelDetailsResDto,
  TextChannelResDto,
} from '~/client-mod/model/text-channel.model';
import { TemplatePageTitleStrategy } from '~/shared-mod/config/template-page-title.strategy';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractWsWebhookProvider } from '~/shared-mod/services/abstract-ws-webhook.provider';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { GuildService } from '../guild/guild.service';
import { TextChannelHttpClientService } from '../text-channel-http-client/text-channel-http-client.service';

@Injectable()
export class TextChannelService extends AbstractWsWebhookProvider<SharedReducer> {
  private _textChannelDetails$ = new BehaviorSubject<
    TextChannelDetailsResDto | undefined
  >(undefined);

  constructor(
    private readonly _textChannelHttpClientService: TextChannelHttpClientService,
    private readonly _templatePageTitleStrategy: TemplatePageTitleStrategy,
    private readonly _guildService: GuildService,
    _store: Store<SharedReducer>
  ) {
    super(_store);
  }

  fetchTextChannelDetails$(
    paramMap$: Observable<ParamMap>
  ): Observable<TextChannelDetailsResDto> {
    return combineLatest([paramMap$, this._onChangeObserver$]).pipe(
      map(([paramMap]) => Number(paramMap.get('textChannelId'))),
      switchMap(textChannelId =>
        this._textChannelHttpClientService.getTextChannelDetails$(textChannelId)
      ),
      tap(textChannelDetails => {
        this._templatePageTitleStrategy.updateCustomTitle(
          textChannelDetails.name
        );
        this._textChannelDetails$.next(textChannelDetails);
      })
    );
  }

  fetchGuildTextChannels$(): Observable<TextChannelResDto[]> {
    return combineLatest([
      this._guildService.guildDetails$,
      this._textChannelDetails$,
      this._onChangeObserver$,
    ]).pipe(
      tap(() => this.setFetching(true)),
      map(([guildDetails]) => guildDetails?.id),
      filter(guildId => !!guildId),
      map(guildId => guildId!),
      switchMap(guildId =>
        this._textChannelHttpClientService.getGuildTextChannels$(guildId)
      ),
      tap(() => this.setFetching(false)),
      catchError(err => {
        this.setFetching(false);
        return throwError(() => err);
      })
    );
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
          this.updateWsSignalValue();
          this.showSuccessSnackbar(message);
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }

  get textChannelDetails$(): Observable<TextChannelDetailsResDto | undefined> {
    return this._textChannelDetails$.asObservable();
  }
}
