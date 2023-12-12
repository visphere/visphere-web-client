/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '~/env/environment';
import { LoggedUser } from '~/shared-mod/models/logged-user.model';
import * as NgrxSelector_SHA from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-user-account-banner',
  templateUrl: './user-account-banner.component.html',
})
export class UserAccountBannerComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() showEditProfileButton = true;

  loggedUser?: LoggedUser;

  readonly path = environment.contentDistributorBaseUrl;

  constructor(private readonly _store: Store<SharedReducer>) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._store.select(NgrxSelector_SHA.selectLoggedUser)
    ).subscribe(loggedUser => {
      if (loggedUser) {
        this.loggedUser = loggedUser;
      }
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
