/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Store } from '@ngrx/store';
import {
  Observable,
  catchError,
  first,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractWsWebhookProvider } from '~/shared-mod/services/abstract-ws-webhook.provider';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import * as NgrxSelector_SHA from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

export abstract class AbstractGuildManagementProvider extends AbstractWsWebhookProvider<SharedReducer> {
  constructor(
    _absStore: Store<SharedReducer>,
    private readonly _absLocalStorageService: LocalStorageService
  ) {
    super(_absStore);
  }

  protected performAction$(
    inputObs$: Observable<BaseMessageModel>,
    removeSavePath: boolean,
    onLoadingCallback: (state: boolean) => void
  ): Observable<null> {
    return of(null).pipe(
      tap(() => onLoadingCallback(true)),
      switchMap(() => inputObs$),
      first(),
      tap(({ message }) => {
        onLoadingCallback(false);
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
      switchMap(() => this._absStore.select(NgrxSelector_SHA.selectLoggedUser)),
      map(loggedUser => {
        if (loggedUser && removeSavePath) {
          this._absLocalStorageService.remove(
            `memorizedPath+${loggedUser.username}`
          );
        }
        return null;
      }),
      catchError(err => {
        onLoadingCallback(false);
        return throwError(() => err);
      })
    );
  }
}
