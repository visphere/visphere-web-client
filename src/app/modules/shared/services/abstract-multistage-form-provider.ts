/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractSimpleFormProvider } from './abstract-simple-form-provider';

export abstract class AbstractMultistageFormProvider<
  T,
  U,
> extends AbstractSimpleFormProvider<U> {
  protected _currentStage$: BehaviorSubject<T>;

  constructor(initialStage: T) {
    super();
    this._currentStage$ = new BehaviorSubject<T>(initialStage);
  }

  setFormStage(stage: T): void {
    this._currentStage$.next(stage);
  }

  get currentStage$(): Observable<T> {
    return this._currentStage$.asObservable();
  }
}
