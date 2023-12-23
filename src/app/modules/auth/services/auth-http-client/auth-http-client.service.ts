/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivateAccountReqDtoModel } from '~/auth-mod/models/activate-account-form.model';
import { ChangePasswordFormModel } from '~/auth-mod/models/change-password-form.model';
import { LoginReqDtoModel } from '~/auth-mod/models/login-form.model';
import {
  MyAccountReqDto,
  MySavedAccountModel,
} from '~/auth-mod/models/my-saved-account.model';
import { RegisterReqDtoModel } from '~/auth-mod/models/register-form.model';
import { StartResetPasswordViaEmailFormModel } from '~/auth-mod/models/reset-password-form.model';
import { AccessRefreshInterceptor } from '~/root-mod/modules/shared/interceptors/access-refresh/access-refresh.interceptor';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { LoginResDtoModel } from '~/shared-mod/models/identity.model';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class AuthHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  loginViaAppAccount$(req: LoginReqDtoModel): Observable<LoginResDtoModel> {
    return this._httpClient.post<LoginResDtoModel>(
      `${this._infraApiPath}/api/v1/user/identity/login`,
      req
    );
  }

  registerViaAppAccount$(
    req: RegisterReqDtoModel
  ): Observable<BaseMessageModel> {
    return this._httpClient.post<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/user/account/new`,
      req
    );
  }

  activateAccount$(token: string): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/user/account/activate/${token}`,
      null
    );
  }

  resendActivateAccountToken$(
    req: ActivateAccountReqDtoModel
  ): Observable<BaseMessageModel> {
    return this._httpClient.post<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/user/account/activate/resend`,
      req
    );
  }

  startResetPasswordViaEmail$(
    req: StartResetPasswordViaEmailFormModel
  ): Observable<BaseMessageModel> {
    return this._httpClient.post<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/user/password/renew/request`,
      req
    );
  }

  resetPasswordValidateToken$(token: string): Observable<BaseMessageModel> {
    return this._httpClient.post<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/user/password/renew/${token}/verify`,
      null
    );
  }

  resendResetPasswordToken$(
    req: StartResetPasswordViaEmailFormModel
  ): Observable<BaseMessageModel> {
    return this._httpClient.post<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/user/password/renew/resend`,
      req
    );
  }

  changePasswordViaEmail$(
    req: ChangePasswordFormModel,
    token: string
  ): Observable<BaseMessageModel> {
    return this._httpClient.patch<any>(
      `${this._infraApiPath}/api/v1/user/password/renew/change/${token}`,
      req
    );
  }

  checkIfMyAccountsExists$(
    req: MyAccountReqDto[]
  ): Observable<MySavedAccountModel[]> {
    return this._httpClient.patch<MySavedAccountModel[]>(
      `${this._infraApiPath}/api/v1/user/check/myaccounts/exists`,
      req
    );
  }

  unlockAccount$(accessToken: string): Observable<BaseMessageModel> {
    const bearer = `${AccessRefreshInterceptor.TOKEN_PREFIX} ${accessToken}`;
    const headers = new HttpHeaders({
      [AccessRefreshInterceptor.TOKEN_HEADER_KEY]: bearer,
    });
    return this._httpClient.post<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/user/account/enable`,
      null,
      { headers }
    );
  }
}
