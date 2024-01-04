/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectUserIsLogged } from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

@Injectable({ providedIn: 'root' })
class LoggedRouteGuard {
  canActivate(
    store: Store<SharedReducer>,
    router: Router
  ): Observable<boolean> {
    return store.select(selectUserIsLogged).pipe(
      map(({ isUserLogged, isInitialLoading }) => {
        if (isUserLogged || isInitialLoading) {
          return true;
        }
        router.navigateByUrl('/auth/login').then(r => r);
        return false;
      })
    );
  }
}

export const canActivateLoggedRoute: CanActivateFn = () =>
  inject(LoggedRouteGuard).canActivate(
    inject(Store<SharedReducer>),
    inject(Router)
  );
