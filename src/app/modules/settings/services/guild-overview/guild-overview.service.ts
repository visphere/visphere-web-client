/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  first,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
  EditGuildReqDto,
  GuildOwnerOverviewResDto,
  UpdateGuildVisibilityReqDto,
} from '~/settings-mod/model/guild-management.model';
import { UpdateSphereGuildOverviewModalType } from '~/settings-mod/types/updatable-modal.type';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractWsWebhookProvider } from '~/shared-mod/services/abstract-ws-webhook.provider';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { GuildManagementHttpClientService } from '../guild-management-http-client/guild-management-http-client.service';
import { SphereGuildService } from '../sphere-guild/sphere-guild.service';

@Injectable()
export class GuildOverviewService extends AbstractWsWebhookProvider<SharedReducer> {
  protected _activeLoading$ =
    new BehaviorSubject<UpdateSphereGuildOverviewModalType>('none');

  constructor(
    private readonly _guildManagementHttpClientService: GuildManagementHttpClientService,
    private readonly _sphereGuildService: SphereGuildService,
    _store: Store<SharedReducer>
  ) {
    super(_store);
  }

  loadGuildOverview$(): Observable<GuildOwnerOverviewResDto> {
    return combineLatest([
      this._sphereGuildService.guildId$,
      this._onChangeObserver$,
    ]).pipe(
      tap(() => this.setFetching(true)),
      map(([guildId]) => guildId),
      switchMap(guildId =>
        this._guildManagementHttpClientService.getGuildOwnerOverview$(guildId)
      ),
      tap(() => this.setFetching(false)),
      catchError(err => {
        this.setFetching(false);
        return throwError(() => err);
      })
    );
  }

  updateGuildDetails$(
    reqDto: EditGuildReqDto,
    activeLoading: UpdateSphereGuildOverviewModalType
  ): Observable<BaseMessageModel> {
    return this.actionOnUpdate$(
      guildId =>
        this._guildManagementHttpClientService.updateGuild$(guildId, reqDto),
      activeLoading
    );
  }

  updateGuildVisibility$(
    reqDto: UpdateGuildVisibilityReqDto
  ): Observable<BaseMessageModel> {
    return this.actionOnUpdate$(
      guildId =>
        this._guildManagementHttpClientService.updateGuildVisibility$(
          guildId,
          reqDto
        ),
      'change-visibility'
    );
  }

  private actionOnUpdate$(
    inputObservable$: (guildId: number) => Observable<BaseMessageModel>,
    activeLoading: UpdateSphereGuildOverviewModalType
  ): Observable<BaseMessageModel> {
    return of(null).pipe(
      tap(() => this._activeLoading$.next(activeLoading)),
      switchMap(() => this._sphereGuildService.guildId$),
      first(),
      switchMap(guildId => inputObservable$(guildId)),
      tap(({ message }) => {
        this._activeLoading$.next('none');
        this.showSuccessSnackbar(message);
      }),
      catchError(err => {
        this._activeLoading$.next('none');
        return throwError(() => err);
      })
    );
  }

  get activeLoading$(): Observable<UpdateSphereGuildOverviewModalType> {
    return this._activeLoading$.asObservable();
  }
}
