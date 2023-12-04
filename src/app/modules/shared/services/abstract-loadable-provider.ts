/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

export abstract class AbstractLoadableProvider extends AbstractReactiveProvider {
  private _isLoading$ = new BehaviorSubject<boolean>(false);

  protected setLoading(isLoading: boolean): void {
    this._isLoading$.next(isLoading);
  }

  get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }
}
