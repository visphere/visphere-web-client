/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { FaviconBadgeNotificatorService } from '../../services/favicon-badge-notificator/favicon-badge-notificator.service';

@Component({
  selector: 'vsph-client-entrypoint-page',
  templateUrl: './client-entry-point-page.component.html',
})
export class ClientEntryPointPageComponent {
  constructor(
    private readonly _faviconBadgeNotificationService: FaviconBadgeNotificatorService
  ) {}

  handleShowNotif(): void {
    this._faviconBadgeNotificationService.showNotify();
  }

  handleHideNotif(): void {
    this._faviconBadgeNotificationService.removeNotify();
  }
}
