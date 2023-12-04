/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FaviconBadgeNotificatorService } from '~/client-mod/services/favicon-badge-notificator/favicon-badge-notificator.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
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
    private readonly _router: Router,
    private readonly _store: Store<SharedReducer>
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

  async handleGotoSettings(): Promise<void> {
    this._store.dispatch(
      NgrxAction_SHA.__setSettingsReturnUrl({ url: this._router.url })
    );
    await this._router.navigateByUrl('settings');
  }
}
