/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataFillFormResDto } from '~/auth-mod/models/oauth2-data.model';
import { FillDataService } from '~/auth-mod/services/fill-data/fill-data.service';
import { environment } from '~/env/environment';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-auth-fill-data-page',
  templateUrl: './auth-fill-data-page.component.html',
  host: { class: 'flex-grow flex flex-col' },
  providers: [FillDataService],
})
export class AuthFillDataPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  userData?: UserDataFillFormResDto;
  path = environment.contentDistributorBaseUrl;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _fillDataService: FillDataService
  ) {
    super();
    this._fillDataService.setRouteParams(this._route);
  }

  ngOnInit(): void {
    this.wrapAsObservable$(this._fillDataService.loadUserData$()).subscribe({
      next: res => (this.userData = res),
      error: async () => await this._router.navigateByUrl('/auth/login'),
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
