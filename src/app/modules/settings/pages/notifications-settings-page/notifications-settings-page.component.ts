/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsSettingsService } from '~/settings-mod/services/notifications-settings/notifications-settings.service';
import { FaviconBadgeNotificatorService } from '~/shared-mod/services/favicon-badge-notificator/favicon-badge-notificator.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-notifications-settings-page',
  templateUrl: './notifications-settings-page.component.html',
  providers: [NotificationsSettingsService],
})
export class NotificationsSettingsPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  isLoading$: Observable<boolean> =
    this._notificationsSettingsService.isLoading$;

  isPushNotifsSelected = false;
  isPushNotifsSoundSelected = false;

  constructor(
    private readonly _notificationsSettingsService: NotificationsSettingsService,
    private readonly _faviconBadgeNotificatorService: FaviconBadgeNotificatorService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable(
      this._notificationsSettingsService.loadPersistedNotifSettings()
    ).subscribe(({ isPushNotifsSelected, isPushNotifsSoundSelected }) => {
      this.isPushNotifsSelected = isPushNotifsSelected;
      this.isPushNotifsSoundSelected = isPushNotifsSoundSelected;
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleChangePushNotifsSetting(isEnabled: boolean): void {
    this.isPushNotifsSelected = isEnabled;
    this.wrapAsObservable(
      this._notificationsSettingsService.persistPushNotifsState(isEnabled)
    ).subscribe({ error: () => (this.isPushNotifsSelected = !isEnabled) });
  }

  handleChangePushNotifsSoundSetting(isEnabled: boolean): void {
    this.isPushNotifsSoundSelected = isEnabled;
    this.wrapAsObservable(
      this._notificationsSettingsService.persistPushNotifsSoundState(isEnabled)
    ).subscribe({ error: () => (this.isPushNotifsSelected = !isEnabled) });
  }

  handlePlayNotifsSound(): void {
    this._faviconBadgeNotificatorService.playNotifySound();
  }
}
