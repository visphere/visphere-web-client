/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractLoadableProvider } from '~/shared-mod/services/abstract-loadable-provider';
import {
  actionAddSnackbar,
  actionCloseDisabledAccountModal,
} from '~/shared-mod/store/actions';
import { selectDisabledAccountAccessToken } from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AuthHttpClientService } from '../auth-http-client/auth-http-client.service';

@Injectable()
export class UnlockAccountService
  extends AbstractLoadableProvider
  implements OnDestroy
{
  private _accessToken = '';

  constructor(
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _store: Store<SharedReducer>
  ) {
    super();
    this.wrapAsObservable$(
      this._store.select(selectDisabledAccountAccessToken)
    ).subscribe(accessToken => (this._accessToken = accessToken));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  unlockAccount$(): Observable<BaseMessageModel> {
    return this._authHttpClientService.unlockAccount$(this._accessToken).pipe(
      tap(({ message }) => {
        this._store.dispatch(
          actionAddSnackbar({
            content: {
              placeholder: message,
              omitTransformation: true,
            },
            severity: 'success',
          })
        );
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  closeModal(): void {
    this.setLoading(false);
    this._store.dispatch(actionCloseDisabledAccountModal());
  }
}
