/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Oauth2LoginService } from '~/auth-mod/services/oauth2-login/oauth2-login.service';
import { environment } from '~/env/environment';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-auth-login-page',
  templateUrl: './auth-login-page.component.html',
  host: { class: 'flex-grow flex flex-col' },
  providers: [Oauth2LoginService],
})
export class AuthLoginPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  path = environment.contentDistributorBaseUrl;
  qrCode =
    'https://upload.wikimedia.org/wikipedia/commons/5/5e/QR_Code_example.png';

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _oauthLoginService: Oauth2LoginService
  ) {
    super();
    this._oauthLoginService.parseQueryParamArgs(this._route);
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._oauthLoginService.performLoginViaProvider$()
    ).subscribe({
      next: async () => this._router.navigateByUrl('/'),
      error: async () => this._router.navigateByUrl('/auth/login'),
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
