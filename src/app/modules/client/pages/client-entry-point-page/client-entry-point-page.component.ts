/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FaviconBadgeNotificatorService } from '~/client-mod/services/favicon-badge-notificator/favicon-badge-notificator.service';
import { IdentityService } from '~/shared-mod/services/identity/identity.service';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { themeModes } from '~/shared-mod/types/theme-mode.type';
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
    private readonly _router: Router,
    private readonly _store: Store<SharedReducer>,
    private readonly _themeSwitcherService: ThemeSwitcherService
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

  handleChangeThemeLight(): void {
    this._themeSwitcherService.changeTheme(themeModes[0].id);
  }

  handleChangeThemeDark(): void {
    this._themeSwitcherService.changeTheme(themeModes[1].id);
  }

  async handleGotoSettings(): Promise<void> {
    this._store.dispatch(
      NgrxAction_SHA.__setSettingsReturnUrl({ url: this._router.url })
    );
    await this._router.navigateByUrl('settings');
  }
}
