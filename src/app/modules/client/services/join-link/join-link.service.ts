/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { JoiningGuildDetailsResDto } from '~/client-mod/model/join-guild.model';
import { AbstractLoadableProvider } from '~/shared-mod/services/abstract-loadable-provider';
import { actionAddSnackbar } from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { JoinLinkHttpClientService } from '../join-link-http-client/join-link-http-client.service';

@Injectable()
export class JoinLinkService extends AbstractLoadableProvider {
  private _isFetching$ = new BehaviorSubject<boolean>(false);
  private _guildError$ = new BehaviorSubject<string>('');

  private _isGuildPublic = false;
  private _guildIdentifier = '';

  constructor(
    private readonly _joinLinkHttpClientService: JoinLinkHttpClientService,
    private readonly _router: Router,
    private readonly _store: Store<SharedReducer>
  ) {
    super();
  }

  fetchGuildDetails$(
    route: ActivatedRoute
  ): Observable<JoiningGuildDetailsResDto> {
    return route.paramMap.pipe(
      tap(() => this._isFetching$.next(true)),
      map(paramMap => ({
        isPublic: this._router.url.includes('public'),
        paramMap,
      })),
      map(({ isPublic, paramMap }) => ({
        isPublic,
        identifier: paramMap.get(isPublic ? 'guildId' : 'token'),
      })),
      filter(({ identifier }) => identifier !== null),
      tap(({ isPublic, identifier }) => {
        this._isGuildPublic = isPublic;
        this._guildIdentifier = identifier as string;
      }),
      switchMap(({ isPublic, identifier }) =>
        this._joinLinkHttpClientService.getGuildDetails$(
          identifier as string,
          isPublic
        )
      ),
      tap(() => this._isFetching$.next(false)),
      catchError(err => {
        this._isFetching$.next(false);
        this._guildError$.next(err.error ? err.error.message : '');
        return throwError(() => err);
      })
    );
  }

  joinToGuild$(): Observable<number> {
    this.setLoading(true);
    return this._joinLinkHttpClientService
      .joinToGuild$(this._guildIdentifier, this._isGuildPublic)
      .pipe(
        map(({ message, guildId }) => {
          this.setLoading(false);
          this._store.dispatch(
            actionAddSnackbar({
              content: {
                placeholder: message,
                omitTransformation: true,
              },
              severity: 'success',
            })
          );
          return guildId;
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }

  get guildError$(): Observable<string> {
    return this._guildError$.asObservable();
  }
  get isFetching$(): Observable<boolean> {
    return this._isFetching$.asObservable();
  }
}
