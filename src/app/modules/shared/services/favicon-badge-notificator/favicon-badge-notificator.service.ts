/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '~/env/environment';
import * as NgrxSelector_SHA from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

@Injectable({ providedIn: 'root' })
export class FaviconBadgeNotificatorService {
  private _iconElement: HTMLLinkElement;
  private _audio: HTMLAudioElement;
  private isPushNotifsSelected = false;
  private isPushNotifsSoundSelected = false;

  constructor(
    @Inject(DOCUMENT) private readonly _document: Document,
    private readonly _store: Store<SharedReducer>
  ) {
    this._iconElement = this._document.getElementById(
      'faviconIcon'
    ) as HTMLLinkElement;
    this._audio = new Audio(
      `${environment.contentDistributorBaseUrl}/static/sfx/notification.mp3`
    );
    this._store
      .select(NgrxSelector_SHA.selectLoggedUser)
      .subscribe(loggedUser => {
        this.isPushNotifsSelected = !!loggedUser?.settings.pushNotifsEnabled;
        this.isPushNotifsSoundSelected =
          !!loggedUser?.settings.pushNotifsSoundEnabled;
      });
  }

  showNotify(): void {
    if (this.isPushNotifsSelected) {
      this._iconElement.setAttribute(
        'href',
        `${environment.contentDistributorBaseUrl}/static/favicon/favicon-badge.png`
      );
      if (this.isPushNotifsSoundSelected) {
        this._audio.play();
      }
    }
  }

  removeNotify(): void {
    if (this.isPushNotifsSelected) {
      this._iconElement.setAttribute(
        'href',
        `${environment.contentDistributorBaseUrl}/static/favicon/favicon-nobadge.png`
      );
    }
  }

  playNotifySound(): void {
    this._audio.play();
  }
}
