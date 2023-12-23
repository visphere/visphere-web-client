/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  delay,
  first,
  map,
  mergeMap,
  of,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WindowInitLoaderService {
  private _isInitLoading$ = new BehaviorSubject<boolean>(true);

  postponedAnimationTrigger$(): Observable<boolean> {
    return this._isInitLoading$.pipe(
      map(isInitialLoading => (isInitialLoading ? 500 : 0)),
      first(),
      mergeMap(time => of(time).pipe(delay(time))),
      map(() => true)
    );
  }

  unsetLoading(): void {
    this._isInitLoading$.next(false);
  }
}
