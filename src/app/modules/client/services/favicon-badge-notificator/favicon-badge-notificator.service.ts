/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { environment } from '~/env/environment';

@Injectable({ providedIn: 'root' })
export class FaviconBadgeNotificatorService {
  private _iconElement: HTMLLinkElement;
  private _audio: HTMLAudioElement;

  private readonly _iconNoBadge = `${environment.contentDistributorBaseUrl}/static/favicon/favicon-nobadge.png`;
  private readonly _iconBadge = `${environment.contentDistributorBaseUrl}/static/favicon/favicon-badge.png`;

  constructor(@Inject(DOCUMENT) private readonly _document: Document) {
    this._iconElement = this._document.getElementById(
      'faviconIcon'
    ) as HTMLLinkElement;
    this._audio = new Audio(
      `${environment.contentDistributorBaseUrl}/static/sfx/notification.mp3`
    );
  }

  showNotify(): void {
    this._iconElement.setAttribute('href', this._iconBadge);
    this._audio.play();
  }

  removeNotify(): void {
    this._iconElement.setAttribute('href', this._iconNoBadge);
  }
}
