/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FaviconBadgeNotificatorService } from '~/client-mod/services/favicon-badge-notificator/favicon-badge-notificator.service';
import { IdentityService } from '~/shared-mod/services/identity/identity.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

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
    private readonly _identityService: IdentityService,
    private readonly _router: Router
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
    this.wrapAsObservable(this._identityService.logout$()).subscribe({
      next: async () => await this._router.navigateByUrl('/auth/login'),
    });
  }
}
