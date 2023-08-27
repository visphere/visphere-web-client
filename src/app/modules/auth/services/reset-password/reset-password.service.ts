/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: reset-password.service.ts
 *   Created at: 2023-08-27, 00:12:37
 *   Last updated at: 2023-08-27, 00:12:38
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
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { ResetPasswordFormStage } from '~/root-mod/modules/auth/types/form-stage.type';

@Injectable()
export class ResetPasswordService {
  private _currentStage$: BehaviorSubject<ResetPasswordFormStage> =
    new BehaviorSubject<ResetPasswordFormStage>('login');

  private _userEmail$: ReplaySubject<string> = new ReplaySubject<string>(1);

  setCurrentStage(stage: ResetPasswordFormStage): void {
    this._currentStage$.next(stage);
  }

  setUserEmail(userEmail: string): void {
    this._userEmail$.next(userEmail);
  }

  get currentStage$(): Observable<ResetPasswordFormStage> {
    return this._currentStage$.asObservable();
  }
  get userEmail$(): Observable<string> {
    return this._userEmail$.asObservable();
  }
}
