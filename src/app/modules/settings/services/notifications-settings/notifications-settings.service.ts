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
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
  UserNotifSettings,
  UserPersistedNofisSettings,
} from '~/settings-mod/model/notifs.model';
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

  loadPersistedNotifSettings$(): Observable<
    UserPersistedNofisSettings & UserNotifSettings
  > {
    return this._onChangeObserver$.pipe(
      switchMap(() =>
        combineLatest([
          this._settingsHttpClientService.getUserSettings$(),
          this._settingsHttpClientService.getUserNotifSettings$(),
        ])
      ),
      map(([userSettings, notifSettings]) => {
        this._store.dispatch(
          NgrxAction_SHA.__updateLoggedUserSettings({ userSettings })
        );
        this._isFetching$.next(false);
        return {
          isPushNotifsSelected: userSettings.pushNotifsEnabled,
          isPushNotifsSoundSelected: userSettings.pushNotifsSoundEnabled,
          isEmailNotifsSelected: notifSettings.isEmailNotifsEnabled,
        };
      })
    );
  }

  persistPushNotifsState$(isEnabled: boolean): Observable<BaseMessageModel> {
    this.setLoading(true);
    return this.performTogglerAction$(
      this._settingsHttpClientService.updateNotifsState$(isEnabled)
    );
  }

  persistPushNotifsSoundState$(
    isEnabled: boolean
  ): Observable<BaseMessageModel> {
    this.setLoading(true);
    return this.performTogglerAction$(
      this._settingsHttpClientService.updateNotifsSoundState$(isEnabled)
    );
  }

  persistEmailNotifsState$(isEnabled: boolean): Observable<BaseMessageModel> {
    this.setLoading(true);
    return this.performTogglerAction$(
      this._settingsHttpClientService.updateEmailNotifsState$(isEnabled)
    );
  }

  private performTogglerAction$(
    inputObservable$: Observable<BaseMessageModel>
  ): Observable<BaseMessageModel> {
    return inputObservable$.pipe(
      tap(({ message }) => {
        this.setLoading(false);
        this.showSuccessSnackbar(message);
        this._onChangeObserver$.next(null);
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }
}
