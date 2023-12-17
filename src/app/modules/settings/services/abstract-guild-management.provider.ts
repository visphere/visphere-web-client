/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractLoadableProvider } from '~/shared-mod/services/abstract-loadable-provider';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

export abstract class AbstractGuildManagementProvider extends AbstractLoadableProvider {
  private _isFetching$ = new BehaviorSubject<boolean>(true);

  constructor(private readonly _absStore: Store<SharedReducer>) {
    super();
  }

  protected performAction$(
    inputObs$: Observable<BaseMessageModel>
  ): Observable<BaseMessageModel> {
    return inputObs$.pipe(
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

  get isFetching$(): Observable<boolean> {
    return this._isFetching$.asObservable();
  }
}
