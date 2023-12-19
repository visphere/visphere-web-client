/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Store } from '@ngrx/store';
import { Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractWsWebhookProvider } from '~/shared-mod/services/abstract-ws-webhook.provider';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

export abstract class AbstractGuildManagementProvider extends AbstractWsWebhookProvider<SharedReducer> {
  constructor(_absStore: Store<SharedReducer>) {
    super(_absStore);
  }

  protected performAction$(
    inputObs$: Observable<BaseMessageModel>
  ): Observable<BaseMessageModel> {
    return of(null).pipe(
      tap(() => this.setLoading(true)),
      switchMap(() => inputObs$),
      tap(({ message }) => {
        this.setLoading(false);
        this._absStore.dispatch(
          NgrxAction_SHA.__addSnackbar({
            content: {
              placeholder: message,
              omitTransformation: true,
            },
            severity: 'success',
          })
        );
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }
}
