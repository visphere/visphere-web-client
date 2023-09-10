/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

export abstract class AbstractLazyProvider<T> extends AbstractReactiveProvider {
  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  protected setLoading(isLoading: boolean): void {
    this._isLoading$.next(isLoading);
  }

  submitForm(): Observable<T> {
    this._isLoading$.next(true);
    return this.abstractSubmitForm();
  }

  abstract abstractSubmitForm(): Observable<T>;

  get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }
}
