/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  map,
  of,
  throwError,
} from 'rxjs';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import {
  actionAddSnackbar,
  actionOpenDisabledAccountModal,
  actionSetLoggedUserDetails,
} from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { OAuth2Supplier } from '~/shared-mod/types/oauth2-supplier.type';
import { Severity } from '~/shared-mod/types/snackbar.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';
import { Oauth2HttpClientService } from '../oauth2-http-client/oauth2-http-client.service';

@Injectable()
export class Oauth2LoginService
  extends AbstractReactiveProvider
  implements OnDestroy
{
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  private _activeSupplier$ = new BehaviorSubject<OAuth2Supplier | null>(null);

  private _token = '';

  constructor(
    private readonly _oauth2HttpClientService: Oauth2HttpClientService,
    private readonly _store: Store<SharedReducer>,
    private readonly _localStorageService: LocalStorageService
  ) {
    super();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  parseQueryParamArgs(route: ActivatedRoute): void {
    const message = route.snapshot.queryParamMap.get('message');
    const type = route.snapshot.queryParamMap.get('type') as Severity;
    if (message) {
      this._store.dispatch(
        actionAddSnackbar({
          content: {
            placeholder: message,
            omitTransformation: true,
          },
          severity: type,
        })
      );
      return;
    }
    this._token = route.snapshot.queryParamMap.get('token') || '';
    this._activeSupplier$.next(
      route.snapshot.queryParamMap.get('supplier') as OAuth2Supplier
    );
    this._isLoading$.next(!!this._token);
  }

  performLoginViaProvider$(): Observable<string> {
    if (!this._token) {
      return of('/auth/login');
    }
    return this._oauth2HttpClientService.loginViaProvider$(this._token).pipe(
      delay(2000),
      map(res => {
        const { isDisabled, accessToken } = res;
        let navigateUrl = '/';
        this._store.dispatch(
          isDisabled
            ? actionOpenDisabledAccountModal({ accessToken })
            : actionSetLoggedUserDetails({
                details: res,
              })
        );
        this._isLoading$.next(false);
        this._activeSupplier$.next(null);
        const memorizedPath = this._localStorageService.get<string>(
          `memorizedPath+${res.username}`
        );
        if (memorizedPath) {
          navigateUrl = memorizedPath;
        }
        return navigateUrl;
      }),
      catchError(err => {
        this._isLoading$.next(false);
        this._activeSupplier$.next(null);
        return throwError(() => err);
      })
    );
  }

  get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }

  get activeSupplier$(): Observable<OAuth2Supplier | null> {
    return this._activeSupplier$.asObservable();
  }
}
