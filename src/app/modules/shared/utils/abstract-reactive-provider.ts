/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Observable, Subject, takeUntil } from 'rxjs';

export abstract class AbstractReactiveProvider {
  protected readonly _subscriptionHook: Subject<void> = new Subject<void>();

  protected unmountAllSubscriptions(): void {
    this._subscriptionHook.next();
    this._subscriptionHook.complete();
  }

  protected wrapAsObservable$<T>(input: Observable<T>): Observable<T> {
    return input.pipe(takeUntil(this._subscriptionHook));
  }
}
