/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: populate-form-control.service.ts
 *   Created at: 2023-08-26, 13:55:52
 *   Last updated at: 2023-08-26, 13:55:52
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
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
