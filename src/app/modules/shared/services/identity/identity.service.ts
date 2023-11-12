/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { APP_INITIALIZER, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, delay, map, of, throwError } from 'rxjs';
import { StorageKeys } from '~/shared-mod/models/identity.model';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { IdentityHttpClientService } from '../identity-http-client/identity-http-client.service';
import { LazyPageLoaderService } from '../lazy-page-loader/lazy-page-loader.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({ providedIn: 'root' })
export class IdentityService {
  constructor(
    private readonly _identityHttpClientService: IdentityHttpClientService,
    private readonly _store: Store<SharedReducer>,
    private readonly _lazyPageLoaderService: LazyPageLoaderService,
    private readonly _localStorageService: LocalStorageService,
    private readonly _router: Router
  ) {}

  refreshSession$(): Observable<boolean> {
    this._lazyPageLoaderService.setLoading();
    const tokenData = this._localStorageService.get<StorageKeys>('loggedUser');
    if (!tokenData) {
      return of(false);
    }
    return this._identityHttpClientService
      .loginViaAccessToken(tokenData.refreshToken)
      .pipe(
        map(res => {
          this._lazyPageLoaderService.disableLoading();
          const { accessToken, refreshToken } = res;
          this._localStorageService.save<StorageKeys>('loggedUser', {
            accessToken,
            refreshToken,
          });
          this._store.dispatch(
            NgrxAction_SHA.__setLoggedUserDetails({
              details: {
                fullName: res.fullName,
                profileUrl: res.profileUrl,
              },
            })
          );
          return true;
        }),
        catchError(err => {
          this._lazyPageLoaderService.disableLoading();
          return throwError(() => err);
        })
      );
  }

  logout$(): Observable<boolean> {
    const tokenData = this._localStorageService.get<StorageKeys>('loggedUser');
    if (!tokenData) {
      return of(false);
    }
    this._lazyPageLoaderService.setLoading();
    return this._identityHttpClientService.logout(tokenData.refreshToken).pipe(
      delay(500),
      map(({ message }) => {
        this._lazyPageLoaderService.disableLoading();
        this._store.dispatch(
          NgrxAction_SHA.__addSnackbar({
            content: {
              placeholder: message,
              omitTransformation: true,
            },
            severity: 'success',
          })
        );
        this._store.dispatch(NgrxAction_SHA.__removeUserDetails());
        this._localStorageService.remove('loggedUser');
        this._router.navigateByUrl('/auth/login').then(r => r);
        return true;
      }),
      catchError(err => {
        this._lazyPageLoaderService.disableLoading();
        return throwError(() => err);
      })
    );
  }
}

function autoChangeLangInitFactory(
  autoChangeLangService: IdentityService
): () => Observable<boolean> {
  return () => autoChangeLangService.refreshSession$();
}

export const autoSessionRefreshInitializer = {
  provide: APP_INITIALIZER,
  useFactory: autoChangeLangInitFactory,
  deps: [IdentityService],
  multi: true,
};
