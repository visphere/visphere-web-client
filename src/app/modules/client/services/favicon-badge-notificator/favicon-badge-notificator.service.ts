/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: favicon-badge-notificator.service.ts
 *   Created at: 2023-08-20, 22:14:30
 *   Last updated at: 2023-08-20, 22:14:39
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
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
