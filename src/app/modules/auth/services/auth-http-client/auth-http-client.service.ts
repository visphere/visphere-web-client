/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ActivateAccountReqDtoModel,
  ActivateAccountResDtoModel,
} from '~/auth-mod/models/activate-account-form.model';
import { ChangePasswordFormModel } from '~/auth-mod/models/change-password-form.model';
import {
  LoginReqDtoModel,
  LoginResDtoModel,
} from '~/auth-mod/models/login-form.model';
import {
  MyAccountReqDto,
  MySavedAccountModel,
} from '~/auth-mod/models/my-saved-account.model';
import { RegisterReqDtoModel } from '~/auth-mod/models/register-form.model';
import { StartResetPasswordViaEmailFormModel } from '~/auth-mod/models/reset-password-form.model';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class AuthHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  loginViaAppAccount(req: LoginReqDtoModel): Observable<LoginResDtoModel> {
    return this._httpClient.post<LoginResDtoModel>(
      `${this._infraApiPath}/api/v1/auth/identity/login`,
      req
    );
  }

  registerViaAppAccount(
    req: RegisterReqDtoModel
  ): Observable<BaseMessageModel> {
    return this._httpClient.post<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/auth/account/new`,
      req
    );
  }

  activateAccount(token: string): Observable<ActivateAccountResDtoModel> {
    return this._httpClient.patch<ActivateAccountResDtoModel>(
      `${this._infraApiPath}/api/v1/auth/account/activate/${token}`,
      null
    );
  }

  resendActivateAccountToken(
    req: ActivateAccountReqDtoModel
  ): Observable<BaseMessageModel> {
    return this._httpClient.post<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/auth/account/activate/resend`,
      req
    );
  }

  startResetPasswordViaEmail(
    req: StartResetPasswordViaEmailFormModel
  ): Observable<BaseMessageModel> {
    return this._httpClient.post<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/auth/password/renew/request`,
      req
    );
  }

  resetPasswordValidateToken(token: string): Observable<BaseMessageModel> {
    return this._httpClient.post<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/auth/password/renew/${token}/verify`,
      null
    );
  }

  resendResetPasswordToken(
    req: StartResetPasswordViaEmailFormModel
  ): Observable<BaseMessageModel> {
    return this._httpClient.post<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/auth/password/renew/resend`,
      req
    );
  }

  changePasswordViaEmail(
    req: ChangePasswordFormModel,
    token: string
  ): Observable<BaseMessageModel> {
    return this._httpClient.patch<any>(
      `${this._infraApiPath}/api/v1/auth/password/renew/change/${token}`,
      req
    );
  }

  checkIfMyAccountsExists(
    req: MyAccountReqDto[]
  ): Observable<MySavedAccountModel[]> {
    return this._httpClient.patch<MySavedAccountModel[]>(
      `${this._infraApiPath}/api/v1/auth/check/myaccounts/exists`,
      req
    );
  }
}
