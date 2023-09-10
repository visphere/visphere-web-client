/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { environment } from '~/env/environment';

@Injectable()
export class AppendLangHeaderInterceptor implements HttpInterceptor {
  constructor(private readonly _translateService: TranslateService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const requestUrl = new URL(req.url);
    if (requestUrl.origin !== environment.javaApiEurekaUrl) {
      return next.handle(req);
    }
    const modifiedRequest = req.clone({
      headers: req.headers.set(
        'Accept-Language',
        this._translateService.currentLang
      ),
    });
    return next.handle(modifiedRequest);
  }
}

export const appendLangInterceptorInitializer = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppendLangHeaderInterceptor,
  multi: true,
};
