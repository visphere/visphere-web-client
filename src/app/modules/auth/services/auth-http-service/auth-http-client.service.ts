/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auth-http-client.service.ts
 *   Created at: 2023-08-27, 14:47:04
 *   Last updated at: 2023-08-27, 15:12:46
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
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivateAccountFormModel } from '~/auth-mod/models/activate-account-form.model';
import { ChangePasswordFormModel } from '~/auth-mod/models/change-password-form.model';
import { LoginFormModel } from '~/auth-mod/models/login-form.model';
import { RegisterFormModel } from '~/auth-mod/models/register-form.model';
import {
  FinishResetPasswordViaEmailFormModel,
  StartResetPasswordViaEmailFormModel,
} from '~/auth-mod/models/reset-password-form.model';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class AuthHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  loginViaAppAccount(
    req: LoginFormModel
  ): Observable<any /* TODO: WILL BE CHANGED */> {
    return this._httpClient.post<any>(
      `${this._infraApiPath}/app-auth/login`,
      req
    );
  }

  registerViaAppAccount(
    req: RegisterFormModel
  ): Observable<any /* TODO: WILL BE CHANGED */> {
    return this._httpClient.post<any>(
      `${this._infraApiPath}/app-auth/register`,
      req
    );
  }

  activateAccount(
    req: ActivateAccountFormModel
  ): Observable<any /* TODO: WILL BE CHANGED */> {
    return this._httpClient.post<any>(
      `${this._infraApiPath}/app-auth/activate`,
      req
    );
  }

  startResetPasswordViaEmail(
    req: StartResetPasswordViaEmailFormModel
  ): Observable<any /* TODO: WILL BE CHANGED */> {
    return this._httpClient.post<any>(
      `${this._infraApiPath}/reset-password/email/start`,
      req
    );
  }

  finishResetPasswordViaEmail(
    req: FinishResetPasswordViaEmailFormModel
  ): Observable<any /* TODO: WILL BE CHANGED */> {
    return this._httpClient.post<any>(
      `${this._infraApiPath}/reset-password/email/finish`,
      req
    );
  }

  changePasswordViaEmail(
    req: ChangePasswordFormModel,
    token: string
  ): Observable<any /* TODO: WILL BE CHANGED */> {
    return this._httpClient.post<any>(
      `${this._infraApiPath}/reset-password/email/change/${token}`,
      req
    );
  }
}
