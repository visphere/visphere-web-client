/*
 * Copyright (c) 2023 by MoonSphere Systems
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
import { Store } from '@ngrx/store';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '~/env/environment';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { flattedErrorResponse } from '~/shared-mod/utils/flatted-error-response';

@Injectable()
export class GlobalExceptionHandlerInterceptor implements HttpInterceptor {
  constructor(private readonly _store: Store<SharedReducer>) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const requestUrl = new URL(req.url);
    if (requestUrl.origin !== environment.javaApiEurekaUrl) {
      return next.handle(req);
    }
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error && err.status !== 401) {
          this._store.dispatch(
            NgrxAction_SHA.__addSnackbar({
              content: flattedErrorResponse(err.error),
              severity: 'danger',
            })
          );
        }
        return throwError(() => err);
      })
    );
  }
}

export const globalExceptionHandlerInterceptorInitializer = {
  provide: HTTP_INTERCEPTORS,
  useClass: GlobalExceptionHandlerInterceptor,
  multi: true,
};