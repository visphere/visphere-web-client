/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy } from '@angular/core';
import { IdentityService } from '~/root-mod/modules/shared/services/identity/identity.service';
import { AbstractReactiveProvider } from '~/root-mod/modules/shared/utils/abstract-reactive-provider';
import { FaviconBadgeNotificatorService } from '../../services/favicon-badge-notificator/favicon-badge-notificator.service';

@Component({
  selector: 'vsph-client-entrypoint-page',
  templateUrl: './client-entry-point-page.component.html',
})
export class ClientEntryPointPageComponent
  extends AbstractReactiveProvider
  implements OnDestroy
{
  constructor(
    private readonly _faviconBadgeNotificationService: FaviconBadgeNotificatorService,
    private readonly _identityService: IdentityService
  ) {
    super();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleShowNotif(): void {
    this._faviconBadgeNotificationService.showNotify();
  }

  handleHideNotif(): void {
    this._faviconBadgeNotificationService.removeNotify();
  }

  handleLogout(): void {
    this.wrapAsObservable(this._identityService.logout$()).subscribe();
  }
}
