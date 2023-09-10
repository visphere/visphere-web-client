/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractSimpleFormProvider } from './abstract-simple-form-provider';

export abstract class AbstractSimpleFormStateProvider<
  T,
  U,
> extends AbstractSimpleFormProvider<U> {
  protected _currentStage$: BehaviorSubject<T>;

  constructor(initialState: T) {
    super();
    this._currentStage$ = new BehaviorSubject<T>(initialState);
  }

  get currentStage$(): Observable<T> {
    return this._currentStage$.asObservable();
  }
}
