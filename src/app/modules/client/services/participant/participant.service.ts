/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
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
  GuildParticipantDetailsResDto,
  GuildParticipantsResDto,
} from '~/client-mod/model/participant.model';
import * as NgrxAction_CLN from '~/client-mod/store/actions';
import * as NgrxSelector_CLN from '~/client-mod/store/selectors';
import { ClientReducer } from '~/client-mod/types/ngx-store.type';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractWsWebhookProvider } from '~/shared-mod/services/abstract-ws-webhook.provider';
import { GuildService } from '../guild/guild.service';
import { ParticipantHttpClientService } from '../participant-http-client/participant-http-client.service';

@Injectable()
export class ParticipantService extends AbstractWsWebhookProvider<ClientReducer> {
  constructor(
    private readonly _participantHttpClientService: ParticipantHttpClientService,
    private readonly _guildService: GuildService,
    private readonly _store: Store<ClientReducer>
  ) {
    super(_store);
  }

  fetchGuildParticipants$(): Observable<GuildParticipantsResDto> {
    return combineLatest([
      this._guildService.guildDetails$,
      this._onChangeObserver$,
    ]).pipe(
      tap(() => this.setFetching(true)),
      filter(([guildDetails]) => !!guildDetails),
      map(([guildDetails]) => guildDetails!.id),
      switchMap(guildId =>
        this._participantHttpClientService.getGuildParticipants$(guildId)
      ),
      tap(() => this.setFetching(false)),
      catchError(err => {
        this.setFetching(false);
        return throwError(() => err);
      })
    );
  }

  getParticipantDetails$(
    guildId: number,
    userId: number
  ): Observable<GuildParticipantDetailsResDto> {
    return this._participantHttpClientService.getGuildParticipantDetails$(
      guildId,
      userId
    );
  }

  leaveGuild$(deleteAllMessages: boolean): Observable<BaseMessageModel> {
    return this.performObservableAction$(
      id =>
        this._participantHttpClientService.leaveGuild$(id, deleteAllMessages),
      false
    );
  }

  kickFromGuild$(
    guildId: number,
    deleteAllMessages: boolean
  ): Observable<BaseMessageModel> {
    return this.performObservableAction$(
      id =>
        this._participantHttpClientService.kickFromGuild$(
          guildId,
          id,
          deleteAllMessages
        ),
      true
    );
  }

  banFromGuild$(
    guildId: number,
    deleteAllMessages: boolean
  ): Observable<BaseMessageModel> {
    return this.performObservableAction$(
      id =>
        this._participantHttpClientService.banFromGuild$(
          guildId,
          id,
          deleteAllMessages
        ),
      true
    );
  }

  private performObservableAction$(
    initHttp$: (id: number) => Observable<BaseMessageModel>,
    refetch: boolean
  ): Observable<BaseMessageModel> {
    return of(null).pipe(
      tap(() => this.setLoading(true)),
      switchMap(() =>
        this._store.select(NgrxSelector_CLN.selectDevastateDetails)
      ),
      first(),
      filter(devastateDetails => !!devastateDetails),
      switchMap(devastateDetails => initHttp$(devastateDetails!.id)),
      tap(({ message }) => {
        this.setLoading(false);
        this.showSuccessSnackbar(message);
        if (refetch) {
          this.updateWsSignalValue();
        }
        this._store.dispatch(NgrxAction_CLN.__closeDevastateMemberModal());
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }
}
