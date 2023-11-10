/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import * as NgrxSelector_ATH from '~/auth-mod/store/selectors';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';

@Injectable()
export class AccountGuard {
  canActivate(store: Store<AuthReducer>, router: Router): Observable<boolean> {
    return store
      .select(NgrxSelector_ATH.selectIsActivateAccountEmailExist)
      .pipe(
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

export const activateAccountGuard: CanActivateFn = () => {
  return inject(AccountGuard).canActivate(inject(Store), inject(Router));
};
