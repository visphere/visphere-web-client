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
import { GuildBannedUser } from '~/settings-mod/model/guild-bans.model';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractWsWebhookProvider } from '~/shared-mod/services/abstract-ws-webhook.provider';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { GuildBansHttpClientService } from '../guild-bans-http-client/guild-bans-http-client.service';
import { SphereGuildService } from '../sphere-guild/sphere-guild.service';

@Injectable()
export class GuildBansService extends AbstractWsWebhookProvider<SharedReducer> {
  constructor(
    private readonly _sphereGuildService: SphereGuildService,
    private readonly _guildBansHttpClientService: GuildBansHttpClientService,
    _store: Store<SharedReducer>
  ) {
    super(_store);
  }

  fetchAllBannedUsers$(): Observable<GuildBannedUser[]> {
    return combineLatest([
      this._sphereGuildService.guildId$,
      this._onChangeObserver$,
    ]).pipe(
      tap(() => this.setFetching(true)),
      map(([guildId]) => guildId),
      filter(guildId => !!guildId),
      switchMap(guildId =>
        this._guildBansHttpClientService.getAllBannedUsers$(guildId)
      ),
      tap(() => this.setFetching(false)),
      catchError(err => {
        this.setFetching(false);
        return throwError(() => err);
      })
    );
  }

  unbanUser$(userId: number): Observable<BaseMessageModel> {
    return of(null).pipe(
      tap(() => this.setLoading(true)),
      switchMap(() => this._sphereGuildService.guildId$),
      first(),
      filter(guildId => !!guildId),
      switchMap(guildId =>
        this._guildBansHttpClientService.unbanUser$(guildId, userId)
      ),
      tap(({ message }) => {
        this.setLoading(false);
        this.showSuccessSnackbar(message);
        this.updateWsSignalValue();
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }
}
