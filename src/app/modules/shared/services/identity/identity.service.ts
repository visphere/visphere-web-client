/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { StorageKeys } from '~/shared-mod/models/identity.model';
import {
  actionAddSnackbar,
  actionSetLoggedUserDetails,
  actionUnsetInitialLoading,
  removeUserDetailsAction,
} from '~/shared-mod/store/actions';
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
    private readonly _localStorageService: LocalStorageService
  ) {}

  refreshSession$(redirectUrl: string): Observable<string> {
    const tokenData = this._localStorageService.get<StorageKeys>('loggedUser');
    if (!tokenData) {
      this._store.dispatch(actionUnsetInitialLoading());
      return of(redirectUrl.includes('auth') ? redirectUrl : 'auth/login');
    }
    return this._identityHttpClientService
      .loginViaAccessToken$(tokenData.refreshToken)
      .pipe(
        map(res => {
          this._lazyPageLoaderService.disableLoading();
          this._store.dispatch(
            actionSetLoggedUserDetails({
              details: res,
            })
          );
          this._store.dispatch(actionUnsetInitialLoading());
          const memorizedPath = this._localStorageService.get<string>(
            `memorizedPath+${res.username}`
          );
          if (memorizedPath && redirectUrl === '/') {
            return memorizedPath;
          }
          return '';
        }),
        catchError(() => {
          this._localStorageService.remove('loggedUser');
          this._store.dispatch(actionUnsetInitialLoading());
          this._lazyPageLoaderService.disableLoading();
          return throwError(() => 'auth/login');
        })
      );
  }

  logout$(): Observable<boolean> {
    const tokenData = this._localStorageService.get<StorageKeys>('loggedUser');
    if (!tokenData) {
      return of(false);
    }
    return this._identityHttpClientService.logout$(tokenData.refreshToken).pipe(
      map(({ message }) => {
        this._store.dispatch(
          actionAddSnackbar({
            content: {
              placeholder: message,
              omitTransformation: true,
            },
            severity: 'success',
          })
        );
        this._store.dispatch(removeUserDetailsAction());
        this._localStorageService.remove('loggedUser');
        return true;
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }
}
