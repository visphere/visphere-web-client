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
  filter,
  first,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
  AllGuildJoinLinks,
  CreateGuildJoinLinkReqDto,
  GuildJoinLink,
  GuildJoinLinkDetails,
  UpdateGuildJoinLinkReqDto,
} from '~/settings-mod/model/guild-join-links.model';
import { JoinLinkUpdatableModalType } from '~/settings-mod/types/updatable-modal.type';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractWsWebhookProvider } from '~/shared-mod/services/abstract-ws-webhook.provider';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { SpinnerListElementType } from '~/shared-mod/types/spinner-list-element.type';
import { GuildJoinLinksHttpClientService } from '../guild-join-links-http-client/guild-join-links-http-client.service';
import { SphereGuildService } from '../sphere-guild/sphere-guild.service';

@Injectable()
export class GuildJoinLinksService extends AbstractWsWebhookProvider<SharedReducer> {
  private _fetchJoinLinkDetails$ = new BehaviorSubject<boolean>(false);
  private _activeModal$ = new BehaviorSubject<JoinLinkUpdatableModalType>(
    'none'
  );
  private _modifiedJoinLink$ = new BehaviorSubject<GuildJoinLink | undefined>(
    undefined
  );

  constructor(
    private readonly _guildJoinLinksHttpClientService: GuildJoinLinksHttpClientService,
    private readonly _sphereGuildService: SphereGuildService,
    _store: Store<SharedReducer>
  ) {
    super(_store);
  }

  fetchAllGuildJoinLinks$(): Observable<AllGuildJoinLinks> {
    return combineLatest([
      this._sphereGuildService.guildId$,
      this._onChangeObserver$,
    ]).pipe(
      tap(() => this.setFetching(true)),
      map(([guildId]) => guildId),
      filter(guildId => !!guildId),
      switchMap(guildId =>
        this._guildJoinLinksHttpClientService.getAllGuildJoinLinks$(guildId)
      ),
      tap(() => this.setFetching(false)),
      catchError(err => {
        this.setFetching(false);
        return throwError(() => err);
      })
    );
  }

  fetchJoinLinkTimestamps$(): Observable<SpinnerListElementType[]> {
    this.setFetching(true);
    return this._guildJoinLinksHttpClientService
      .getAllExpirationTimestamps$()
      .pipe(
        tap(() => this.setFetching(false)),
        catchError(err => {
          this.setFetching(false);
          return throwError(() => err);
        })
      );
  }

  getGuildJoinLinkDetails$(): Observable<GuildJoinLinkDetails> {
    this._fetchJoinLinkDetails$.next(true);
    return this._modifiedJoinLink$.pipe(
      filter(joinLink => !!joinLink),
      map(joinLink => joinLink!.id),
      tap(() => this._fetchJoinLinkDetails$.next(true)),
      switchMap(linkId =>
        this._guildJoinLinksHttpClientService.getGuildJoinLinkDetails$(linkId)
      ),
      first(),
      tap(() => this._fetchJoinLinkDetails$.next(false)),
      catchError(err => {
        this._fetchJoinLinkDetails$.next(false);
        return throwError(() => err);
      })
    );
  }

  createGuildJoinLink$(
    reqDto: CreateGuildJoinLinkReqDto
  ): Observable<BaseMessageModel> {
    return of(null).pipe(
      tap(() => this.setLoading(true)),
      switchMap(() => this._sphereGuildService.guildId$),
      first(),
      filter(guildId => !!guildId),
      switchMap(guildId =>
        this._guildJoinLinksHttpClientService.createGuildJoinLink$(
          guildId,
          reqDto
        )
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

  updateGuildJoinLink$(
    linkId: number,
    reqDto: UpdateGuildJoinLinkReqDto
  ): Observable<BaseMessageModel> {
    return this.performActionWithLinkId$(
      this._guildJoinLinksHttpClientService.updateGuildJoinLink$(
        linkId,
        reqDto
      ),
      true
    );
  }

  updateGuildJoinLinkActivity$(
    linkId: number,
    isActive: boolean
  ): Observable<BaseMessageModel> {
    return this.performActionWithLinkId$(
      this._guildJoinLinksHttpClientService.updateGuildJoinLinkActivity$(
        linkId,
        isActive
      ),
      false
    );
  }

  deleteGuildJoinLink$(linkId: number): Observable<BaseMessageModel> {
    return this.performActionWithLinkId$(
      this._guildJoinLinksHttpClientService.deleteGuildJoinLink$(linkId),
      true
    );
  }

  openModal(type: JoinLinkUpdatableModalType): void {
    this._activeModal$.next(type);
  }

  closeModal(): void {
    this._activeModal$.next('none');
  }

  setModifiedJoinLink(link: GuildJoinLink | undefined): void {
    this._modifiedJoinLink$.next(link);
  }

  private performActionWithLinkId$(
    initObservable$: Observable<BaseMessageModel>,
    refetch: boolean
  ): Observable<BaseMessageModel> {
    return of(null).pipe(
      tap(() => this.setLoading(true)),
      switchMap(() => initObservable$),
      first(),
      tap(({ message }) => {
        this.setLoading(false);
        this.showSuccessSnackbar(message);
        if (refetch) {
          this.updateWsSignalValue();
        }
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }

  get fetchingJoinLinkDetails$(): Observable<boolean> {
    return this._fetchJoinLinkDetails$.asObservable();
  }
  get activeModal$(): Observable<JoinLinkUpdatableModalType> {
    return this._activeModal$.asObservable();
  }
  get modifiedJoinLink$(): Observable<GuildJoinLink | undefined> {
    return this._modifiedJoinLink$.asObservable();
  }
}
