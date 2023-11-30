/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityService } from './modules/shared/services/identity/identity.service';
import { AbstractReactiveProvider } from './modules/shared/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-mount',
  template: `
    <vsph-lazy-page-loader />
    <vsph-snackbars-container />
    <div class="flex flex-col flex-grow">
      <router-outlet></router-outlet>
    </div>
  `,
  host: { class: 'flex flex-col h-full min-h-screen' },
})
export class AppRootComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  redirectUrl = '/';

  constructor(
    private readonly _identityService: IdentityService,
    private readonly _router: Router
  ) {
    super();
    this.redirectUrl = this._router.url;
  }

  ngOnInit(): void {
    this.wrapAsObservable(
      this._identityService.refreshSession$(this.redirectUrl)
    ).subscribe({
      next: async (url: string) => await this._router.navigateByUrl(url),
      error: async () => await this._router.navigateByUrl('auth/login'),
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
