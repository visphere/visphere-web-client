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
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
  CreateGuildForm,
  SphereGuildCategory,
  UserGuildResDto,
} from '~/client-mod/model/guild.model';
import { CreateOrJoinGuildModalMode } from '~/client-mod/types/modal-mode.type';
import { AbstractWsWebhookProvider } from '~/shared-mod/services/abstract-ws-webhook.provider';
import { LazyPageLoaderService } from '~/shared-mod/services/lazy-page-loader/lazy-page-loader.service';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { GuildHttpClientService } from '../guild-http-client/guild-http-client.service';

@Injectable()
export class GuildService extends AbstractWsWebhookProvider<SharedReducer> {
  private _isFormLoading$ = new BehaviorSubject<boolean>(false);
  private _createGuildModalMode$ =
    new BehaviorSubject<CreateOrJoinGuildModalMode>('create');

  constructor(
    private readonly _guildHttpClientService: GuildHttpClientService,
    private readonly _lazyPageLoaderService: LazyPageLoaderService,
    _store: Store<SharedReducer>
  ) {
    super(_store);
  }

  setModalMode(mode: CreateOrJoinGuildModalMode): void {
    this._createGuildModalMode$.next(mode);
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
    return this._guildHttpClientService.joinViaCode$(code).pipe(
      map(({ id, message }) => {
        this.setLoading(false);
        this.showSuccessSnackbar(message);
        this.updateWsSignalValue();
        return id;
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
    return this._guildHttpClientService
      .createNewGuild$({ ...formData, category })
      .pipe(
        map(({ id, message }) => {
          this.setLoading(false);
          this.showSuccessSnackbar(message);
          this.updateWsSignalValue();
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
}
