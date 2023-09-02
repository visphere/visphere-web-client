/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: lazy-page-loader.service.ts
 *   Created at: 2023-09-01, 13:42:27
 *   Last updated at: 2023-09-01, 13:42:27
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
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
  private _lazyLoaderIsVisible$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  constructor(
    private readonly _router: Router,
    @Inject(DOCUMENT) private readonly _document: Document
  ) {}

  initLoader(): void {
    this._router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        disableBodyScroll(this._document.documentElement);
        this._lazyLoaderIsVisible$.next(true);
      } else if (event instanceof RouteConfigLoadEnd) {
        setTimeout(() => {
          enableBodyScroll(this._document.documentElement);
          this._lazyLoaderIsVisible$.next(false);
        }, 1500);
      }
    });
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
