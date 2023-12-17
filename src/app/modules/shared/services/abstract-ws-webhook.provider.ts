/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractLoadableProvider } from '~/shared-mod/services/abstract-loadable-provider';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';

export abstract class AbstractWsWebhookProvider<
  T,
> extends AbstractLoadableProvider {
  protected _onChangeObserver$ = new BehaviorSubject<null>(null);
  protected _isFetching$ = new BehaviorSubject<boolean>(true);

  constructor(private readonly _absStore: Store<T>) {
    super();
  }

  protected showSuccessSnackbar(message: string): void {
    this._absStore.dispatch(
      NgrxAction_SHA.__addSnackbar({
        content: {
          placeholder: message,
          omitTransformation: true,
        },
        severity: 'success',
      })
    );
  }

  updateWsSignalValue(): void {
    this._onChangeObserver$.next(null);
  }

  get isFetching$(): Observable<boolean> {
    return this._isFetching$.asObservable();
  }
}
