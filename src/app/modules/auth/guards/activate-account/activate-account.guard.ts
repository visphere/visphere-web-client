/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: activate-account.guard.ts
 *   Created at: 2023-08-25, 22:40:47
 *   Last updated at: 2023-08-25, 22:40:47
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
import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import * as NgrxSelector_ATH from '~/auth-mod/store/selectors';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';

@Injectable()
export class ActivateAccountGuard {
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
  return inject(ActivateAccountGuard).canActivate(
    inject(Store),
    inject(Router)
  );
};
