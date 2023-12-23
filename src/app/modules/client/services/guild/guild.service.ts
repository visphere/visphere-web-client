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
  distinctUntilChanged,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
  CreateGuildForm,
  GuildDetailsResDto,
  SphereGuildCategory,
  UserGuildResDto,
} from '~/client-mod/model/guild.model';
import * as NgrxAction_CLN from '~/client-mod/store/actions';
import { CreateOrJoinGuildModalMode } from '~/client-mod/types/modal-mode.type';
import { ClientReducer } from '~/client-mod/types/ngx-store.type';
import { TemplatePageTitleStrategy } from '~/shared-mod/config/template-page-title.strategy';
import { AbstractWsWebhookProvider } from '~/shared-mod/services/abstract-ws-webhook.provider';
import { LazyPageLoaderService } from '~/shared-mod/services/lazy-page-loader/lazy-page-loader.service';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { GuildHttpClientService } from '../guild-http-client/guild-http-client.service';
import { JoinLinkHttpClientService } from '../join-link-http-client/join-link-http-client.service';

@Injectable()
export class GuildService extends AbstractWsWebhookProvider<
  SharedReducer | ClientReducer
> {
  private _isFormLoading$ = new BehaviorSubject<boolean>(false);
  private _createGuildModalMode$ =
    new BehaviorSubject<CreateOrJoinGuildModalMode>('create');
  private _guildDetails$ = new BehaviorSubject<GuildDetailsResDto | undefined>(
    undefined
  );

  constructor(
    private readonly _guildHttpClientService: GuildHttpClientService,
    private readonly _joinLinkHttpClientService: JoinLinkHttpClientService,
    private readonly _lazyPageLoaderService: LazyPageLoaderService,
    private readonly _templatePageTitleStrategy: TemplatePageTitleStrategy,
    private readonly _store: Store<SharedReducer | ClientReducer>
  ) {
    super(_store);
  }

  setModalMode(mode: CreateOrJoinGuildModalMode): void {
    this._createGuildModalMode$.next(mode);
  }

  resetGuildDetails(): void {
    this._guildDetails$.next(undefined);
  }

  fetchGuildDetails$(
    paramMap$: Observable<ParamMap>
  ): Observable<GuildDetailsResDto> {
    return combineLatest([paramMap$, this._onChangeObserver$]).pipe(
      tap(() => this._lazyPageLoaderService.setLoading()),
      map(([paramMap]) => Number(paramMap.get('guildId'))),
      distinctUntilChanged(),
      switchMap(guildId =>
        this._guildHttpClientService.getGuildDetails$(guildId)
      ),
      tap(guildDetails => {
        this._templatePageTitleStrategy.updateCustomTitle(guildDetails.name);
        this._guildDetails$.next(guildDetails);
        this._lazyPageLoaderService.disableLoading();
      }),
      catchError(err => {
        this._lazyPageLoaderService.disableLoading();
        return throwError(() => err);
      })
    );
  }

  getAllUserGuilds$(): Observable<UserGuildResDto[]> {
    return this._onChangeObserver$.pipe(
      tap(() => this._lazyPageLoaderService.setLoading()),
      switchMap(() => this._guildHttpClientService.getAllGuildsForUser$()),
      map(userGuilds => {
        this._lazyPageLoaderService.disableLoading();
        return userGuilds;
      }),
      catchError(err => {
        this._lazyPageLoaderService.disableLoading();
        return throwError(() => err);
      })
    );
  }

  getSphereCategories$(): Observable<SphereGuildCategory[]> {
    this._isFormLoading$.next(true);
    return this._guildHttpClientService.getSphereCategories$().pipe(
      tap(() => this._isFormLoading$.next(false)),
      catchError(err => {
        this._lazyPageLoaderService.disableLoading();
        return throwError(() => err);
      })
    );
  }

  joinToSphereViaCode$(code: string): Observable<number> {
    this.setLoading(true);
    return this._joinLinkHttpClientService.joinToGuild$(code, false).pipe(
      map(({ guildId, message }) => {
        this.setLoading(false);
        this.showSuccessSnackbar(message);
        this.updateWsSignalValue();
        this._store.dispatch(NgrxAction_CLN.__closeModal());
        return guildId;
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }

  createNewSphere$(
    formData: CreateGuildForm,
    category: string
  ): Observable<number> {
    this.setLoading(true);
    return this._guildHttpClientService
      .createNewGuild$({ ...formData, category })
      .pipe(
        map(({ id, message }) => {
          this.setLoading(false);
          this.showSuccessSnackbar(message);
          this.updateWsSignalValue();
          this._store.dispatch(NgrxAction_CLN.__closeModal());
          return id;
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }

  get createGuildModalMode$(): Observable<CreateOrJoinGuildModalMode> {
    return this._createGuildModalMode$.asObservable();
  }
  get isFormLoading$(): Observable<boolean> {
    return this._isFormLoading$.asObservable();
  }
  get guildDetails$(): Observable<GuildDetailsResDto | undefined> {
    return this._guildDetails$.asObservable();
  }
}
