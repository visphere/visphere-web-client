/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Oauth2LoginService } from '~/auth-mod/services/oauth2-login/oauth2-login.service';
import { Oauth2Type, oauth2Style } from '~/auth-mod/types/oauth2.type';
import { environment } from '~/env/environment';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { OAuth2Supplier } from '~/shared-mod/types/oauth2-supplier.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-oauth2-button',
  templateUrl: './oauth2-button.component.html',
})
export class Oauth2ButtonComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() oauth2Type!: Oauth2Type;

  path = environment.contentDistributorBaseUrl;
  styles = oauth2Style;
  lang = '';

  isLoading$: Observable<boolean> = this._oauthLoginService.isLoading$;
  activeSupplier$: Observable<OAuth2Supplier | null> =
    this._oauthLoginService.activeSupplier$;

  constructor(
    private readonly _oauthLoginService: Oauth2LoginService,
    @Inject(DOCUMENT) private readonly _document: Document,
    private readonly _languageSwitcherService: LanguageSwitcherService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable(
      this._languageSwitcherService.selectedLang$
    ).subscribe(({ lang }) => {
      this.lang = lang;
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handlePerformRedirectToProvider(): void {
    const params = new URLSearchParams();
    params.append('be', this._document.location.origin);
    params.append('le', 'auth/login');
    params.append('se', 'auth/fill-data');
    params.append('l', this.lang);

    const baseRedirectUri =
      environment.infraApiGatewayUrl +
      '/oauth2/authorization/' +
      this.oauth2Type;

    const urlWithParams = new URL(baseRedirectUri);
    urlWithParams.search = params.toString();

    this._document.location.href = urlWithParams.href;
  }
}
