/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';
import { UserPersistedNofisSettings } from '~/settings-mod/model/notifs.model';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractUserSettingsProvider } from '../abstract-user-settings.provider';
import { SettingsHttpClientService } from '../settings-http-client/settings-http-client.service';

@Injectable()
export class NotificationsSettingsService extends AbstractUserSettingsProvider {
  constructor(
    private readonly _settingsHttpClientService: SettingsHttpClientService,
    private readonly _store: Store<SharedReducer>
  ) {
    super(_store);
  }

  loadPersistedNotifSettings$(): Observable<UserPersistedNofisSettings> {
    return this._onChangeObserver$.pipe(
      switchMap(() => this._settingsHttpClientService.getUserSettings$()),
      map(userSettings => {
        this._store.dispatch(
          NgrxAction_SHA.__updateLoggedUserSettings({ userSettings })
        );
        this._isFetching$.next(false);
        return {
          isPushNotifsSelected: userSettings.pushNotifsEnabled,
          isPushNotifsSoundSelected: userSettings.pushNotifsSoundEnabled,
        };
      })
    );
  }

  persistPushNotifsState$(isEnabled: boolean): Observable<BaseMessageModel> {
    this.setLoading(true);
    return this._settingsHttpClientService.updateNotifsState$(isEnabled).pipe(
      tap(({ message }) => {
        this.setLoading(false);
        this.showSuccessSnackbar(message);
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }

  persistPushNotifsSoundState$(
    isEnabled: boolean
  ): Observable<BaseMessageModel> {
    this.setLoading(true);
    return this._settingsHttpClientService
      .updateNotifsSoundState$(isEnabled)
      .pipe(
        tap(({ message }) => {
          this.setLoading(false);
          this.showSuccessSnackbar(message);
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }
}
