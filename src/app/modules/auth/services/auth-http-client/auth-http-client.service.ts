/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
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
