/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, combineLatest } from 'rxjs';

@Injectable()
export class PopulateFormControlService {
  private _formControlName$: ReplaySubject<string> = new ReplaySubject<string>(
    1
  );
  private _i18nPrefix$: ReplaySubject<string> = new ReplaySubject<string>(1);

  setFields(formControlName: string, i18nPrefix: string): void {
    this._formControlName$.next(formControlName);
    this._i18nPrefix$.next(i18nPrefix);
  }

  get fields$(): Observable<string[]> {
    return combineLatest([this._formControlName$, this._i18nPrefix$]);
  }

  get formControlName$(): Observable<string> {
    return this._formControlName$.asObservable();
  }

  get i18nPrefix$(): Observable<string> {
    return this._i18nPrefix$.asObservable();
  }
}
