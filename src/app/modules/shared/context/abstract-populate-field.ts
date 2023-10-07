/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Observable, ReplaySubject } from 'rxjs';

export abstract class AbstractPopulateField<T> {
  private _field$: ReplaySubject<T> = new ReplaySubject<T>(1);

  setField(field: T): void {
    this._field$.next(field);
  }

  get field$(): Observable<T> {
    return this._field$;
  }
}
