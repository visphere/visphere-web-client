/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter, map, switchMap } from 'rxjs';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import * as NgrxSelector_SHA from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

@Injectable()
export class RoutePersistorService {
  constructor(
    private readonly _localStorageService: LocalStorageService,
    private readonly _router: Router,
    private readonly _store: Store<SharedReducer>
  ) {}

  persistRoute$(): Observable<string> {
    return this._router.events.pipe(
      filter(events => events instanceof NavigationEnd),
      switchMap(() => this._store.select(NgrxSelector_SHA.selectLoggedUser)),
      filter(loggedUser => !!loggedUser),
      map(loggedUser => {
        const url = this._router.url;
        this._localStorageService.save(
          `memorizedPath+${loggedUser?.username}`,
          url
        );
        return url;
      })
    );
  }
}
