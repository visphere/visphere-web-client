/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, Inject, Injectable } from '@angular/core';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LazyPageLoaderService {
  private _lazyLoaderIsVisible$ = new BehaviorSubject<boolean>(true);

  constructor(
    private readonly _router: Router,
    @Inject(DOCUMENT) private readonly _document: Document
  ) {}

  initLoader(): void {
    this._router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.setLoading();
      } else if (event instanceof RouteConfigLoadEnd) {
        setTimeout(() => {
          this.disableLoading();
        }, 1500);
      }
    });
  }

  setLoading(): void {
    disableBodyScroll(this._document.documentElement);
    this._lazyLoaderIsVisible$.next(true);
  }

  disableLoading(): void {
    enableBodyScroll(this._document.documentElement);
    this._lazyLoaderIsVisible$.next(false);
  }

  get lazyLoaderIsVisible$(): Observable<boolean> {
    return this._lazyLoaderIsVisible$.asObservable();
  }
}

function lazyPageLoaderInitFactory(
  lazyPageLoader: LazyPageLoaderService
): () => void {
  return () => lazyPageLoader.initLoader();
}

export const lazyPageLoaderInitializer = {
  provide: APP_INITIALIZER,
  useFactory: lazyPageLoaderInitFactory,
  deps: [LazyPageLoaderService],
  multi: true,
};
