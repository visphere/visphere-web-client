/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import * as NgrxSelector_SHA from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

@Injectable()
export class LoggedRouteGuard {
  canActivate(
    store: Store<SharedReducer>,
    router: Router,
    redirPath: string,
    revertCondition: boolean
  ): Observable<boolean> {
    return store.select(NgrxSelector_SHA.selectUserIsLogged).pipe(
      map(isLogged => {
        let condition = isLogged;
        if (revertCondition) {
          condition = !condition;
        }
        if (condition) {
          return true;
        }
        router.navigate([redirPath]).then(r => r);
        return false;
      })
    );
  }
}

export const activateLoggedRouteGuard: CanActivateFn = () => {
  return inject(LoggedRouteGuard).canActivate(
    inject(Store),
    inject(Router),
    '/auth/login',
    false
  );
};

export const activateNotLoggedRouteGuard: CanActivateFn = () => {
  return inject(LoggedRouteGuard).canActivate(
    inject(Store),
    inject(Router),
    '/',
    true
  );
};
