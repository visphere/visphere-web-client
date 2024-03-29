/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectIsMfaSetted } from '~/auth-mod/store/selectors';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';

@Injectable()
export class MfaCodeGuard {
  canActivate(store: Store<AuthReducer>, router: Router): Observable<boolean> {
    return store.select(selectIsMfaSetted).pipe(
      map(exist => {
        if (exist) {
          return true;
        }
        router.navigate(['/auth/login']).then(r => r);
        return false;
      })
    );
  }
}

export const activateMfaCodeGuard: CanActivateFn = () => {
  return inject(MfaCodeGuard).canActivate(inject(Store), inject(Router));
};
