/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { environment } from '~/env/environment';
import {
  RefreshTokenReqDto,
  StorageKeys,
} from '~/shared-mod/models/identity.model';
import { IdentityHttpClientService } from '~/shared-mod/services/identity-http-client/identity-http-client.service';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

@Injectable()
export class AccessRefreshInterceptor implements HttpInterceptor {
  private _isRefreshing = false;
  private _refreshTokenSubject$ = new BehaviorSubject<string | null>(null);

  private readonly TOKEN_PREFIX = 'Bearer';
  private readonly TOKEN_HEADER_KEY = 'Authorization';

  constructor(
    private readonly _identityHttpClientService: IdentityHttpClientService,
    private readonly _localStorageService: LocalStorageService,
    private readonly _store: Store<SharedReducer>,
    private readonly _router: Router
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const apiGateway = environment.infraApiGatewayUrl;
    if (!apiGateway || !req.url.includes(`${apiGateway}/api`)) {
      return next.handle(req);
    }
    let authReq = req;
    const tokenData = this._localStorageService.get<StorageKeys>('loggedUser');
    if (tokenData) {
      authReq = this.addTokenHeader(req, tokenData.accessToken);
    }
    return next.handle(authReq).pipe(
      catchError(err => {
        if (
          err instanceof HttpErrorResponse &&
          err.status === 401 &&
          (!err.url?.includes('login') || err.url?.includes('login/token'))
        ) {
          return this.handle401Error(authReq, next, tokenData);
        }
        return throwError(() => err);
      })
    );
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler,
    tokenData: StorageKeys | null
  ) {
    if (!this._isRefreshing) {
      this._isRefreshing = true;
      this._refreshTokenSubject$.next(null);
    }
    if (tokenData && tokenData.refreshToken) {
      const { accessToken, refreshToken } = tokenData;
      const reqDto: RefreshTokenReqDto = {
        expiredAccessToken: accessToken,
        refreshToken,
      };
      return this._identityHttpClientService.refrehToken$(reqDto).pipe(
        switchMap(res => {
          this._isRefreshing = false;
          this._localStorageService.save<StorageKeys>('loggedUser', {
            accessToken: res.renewAccessToken,
            refreshToken: res.refreshToken,
          });
          this._refreshTokenSubject$.next(res.renewAccessToken);
          return next.handle(this.addTokenHeader(req, res.renewAccessToken));
        }),
        catchError(err => {
          this._isRefreshing = false;
          this._store.dispatch(NgrxAction_SHA.__removeUserDetails());
          this._localStorageService.remove('loggedUser');
          this._router.navigateByUrl('/auth/login').then(r => r);
          return throwError(() => new Error(err));
        })
      );
    }
    return this._refreshTokenSubject$.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next.handle(this.addTokenHeader(req, token!)))
    );
  }

  private addTokenHeader(
    req: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set(
        this.TOKEN_HEADER_KEY,
        `${this.TOKEN_PREFIX} ${token}`
      ),
    });
  }
}

export const accessRefreshInterceptorInitializer = {
  provide: HTTP_INTERCEPTORS,
  useClass: AccessRefreshInterceptor,
  multi: true,
};
