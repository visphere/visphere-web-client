/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: login.service.ts
 *   Created at: 2023-08-26, 15:25:21
 *   Last updated at: 2023-08-26, 15:25:21
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
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginFormModel } from '~/auth-mod/models/login-form.model';
import { AuthHttpClientService } from '~/auth-mod/services/auth-http-client/auth-http-client.service';
import { LoginFormStage } from '~/auth-mod/types/form-stage.type';
import { AbstractMultistageFormProvider } from '~/shared-mod/services/abstract-multistage-form-provider';

@Injectable()
export class LoginService
  extends AbstractMultistageFormProvider<LoginFormStage, void>
  implements OnDestroy
{
  private _isNextButtonEnabled$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private readonly _authHttpClientService: AuthHttpClientService) {
    super('login');
  }

  onValueChange(): void {
    this.listenChanges<LoginFormModel>((formValues: LoginFormModel) => {
      this._isNextButtonEnabled$.next(
        formValues.usernameOrEmailAddress.length !== 0
      );
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  moveForward(): void {
    this._currentStage$.next('password');
  }

  moveBackward(): void {
    this._currentStage$.next('login');
    this._rootForm.get('password')?.reset();
  }

  override abstractSubmitForm(): Observable<void> {
    const data = this.parseFormValues<LoginFormModel>();
    // next
    console.log(data);

    return of();
  }

  get isNextButtonEnabled$(): Observable<boolean> {
    return this._isNextButtonEnabled$.asObservable();
  }
}
