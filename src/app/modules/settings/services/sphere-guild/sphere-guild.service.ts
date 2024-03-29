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
  catchError,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { GuildOwnerDetailsResDto } from '~/settings-mod/model/guild-management.model';
import { LazyPageLoaderService } from '~/shared-mod/services/lazy-page-loader/lazy-page-loader.service';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import { PasswordConfirmationService } from '~/shared-mod/services/password-confirmation/password-confirmation.service';
import { actionAddSnackbar } from '~/shared-mod/store/actions';
import { selectLoggedUser } from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractGuildManagementProvider } from '../abstract-guild-management.provider';
import { GuildManagementHttpClientService } from '../guild-management-http-client/guild-management-http-client.service';

@Injectable()
export class SphereGuildService extends AbstractGuildManagementProvider {
  private _guildId$ = new ReplaySubject<number>(1);
  private _guildDetails$ = new ReplaySubject<GuildOwnerDetailsResDto>(1);

  constructor(
    private readonly _store: Store<SharedReducer>,
    private readonly _guildManagementHttpClientService: GuildManagementHttpClientService,
    private readonly _passwordConfirmationService: PasswordConfirmationService,
    private readonly _lazyPageLoaderService: LazyPageLoaderService,
    private readonly _localStorageService: LocalStorageService
  ) {
    super(_store, _localStorageService);
  }

  loadGuildDetails$(
    route: ActivatedRoute
  ): Observable<GuildOwnerDetailsResDto> {
    return route.paramMap.pipe(
      tap(() => this._lazyPageLoaderService.setLoading()),
      map(paramMap => Number(paramMap.get('guildId'))),
      filter(guildId => !!guildId),
      tap(guildId => this._guildId$.next(guildId)),
      distinctUntilChanged(),
      switchMap(guildId =>
        this._guildManagementHttpClientService.getGuildOwnerDetails$(guildId)
      ),
      tap(guildDetails => {
        this._guildDetails$.next(guildDetails);
        this._lazyPageLoaderService.disableLoading();
      }),
      catchError(err => {
        this._lazyPageLoaderService.disableLoading();
        return throwError(() => err);
      })
    );
  }

  deleteGuild$(guildId: number, passwordOrMfaCode: string): Observable<null> {
    const reqDto =
      this._passwordConfirmationService.formatToConfirmationDto(
        passwordOrMfaCode
      );
    this._passwordConfirmationService.setLoading(true);
    return this._guildManagementHttpClientService
      .deleteGuild$(guildId, reqDto)
      .pipe(
        tap(({ message }) => {
          this._passwordConfirmationService.setLoading(false);
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
        switchMap(() => this._store.select(selectLoggedUser)),
        map(loggedUser => {
          if (loggedUser) {
            this._localStorageService.remove(
              `memorizedPath+${loggedUser.username}`
            );
          }
          return null;
        }),
        catchError(err => {
          this._passwordConfirmationService.setLoading(false);
          this._passwordConfirmationService.setStage('password');
          return throwError(() => err);
        })
      );
  }

  get guildId$(): Observable<number> {
    return this._guildId$.asObservable();
  }
}
