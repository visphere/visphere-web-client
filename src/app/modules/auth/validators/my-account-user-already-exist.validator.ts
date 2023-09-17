/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import * as NgrxSelector_ATH from '~/auth-mod/store/selectors';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';
import { AuthReducer } from '../types/ngrx-store.type';

@Injectable()
export class MyAcccountUserAlreadyExistValidator
  extends AbstractReactiveProvider
  implements OnDestroy
{
  private _savedAccountUsernames: string[] = [];

  constructor(private readonly _store: Store<AuthReducer>) {
    super();
    this.wrapAsObservable(
      this._store.select(NgrxSelector_ATH.selectMySavedAccounts)
    )
      .pipe(
        map(accounts =>
          accounts.map(({ usernameOrEmailAddress }) => usernameOrEmailAddress)
        )
      )
      .subscribe(accounts => (this._savedAccountUsernames = accounts));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  validate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this._savedAccountUsernames.includes(control.value)) {
        return { exist: true };
      }
      return null;
    };
  }
}
