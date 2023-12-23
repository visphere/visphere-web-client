/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginReqDtoModel } from '~/auth-mod/models/login-form.model';
import { MfaAuthenticatorDataResDto } from '~/auth-mod/models/mfa-data.model';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { LoginResDtoModel } from '~/shared-mod/models/identity.model';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class MfaHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getAuthenticatorData$(
    req: LoginReqDtoModel
  ): Observable<MfaAuthenticatorDataResDto> {
    return this._httpClient.post<MfaAuthenticatorDataResDto>(
      `${this._infraApiPath}/api/v1/user/mfa/authenticator/data`,
      req
    );
  }

  verifyCode$(
    code: string,
    firstSetup: boolean,
    req: LoginReqDtoModel
  ): Observable<LoginResDtoModel> {
    return this._httpClient.patch<LoginResDtoModel>(
      `${this._infraApiPath}/api/v1/user/mfa/authenticator/verify/${code}`,
      req,
      { params: { firstSetup } }
    );
  }

  alternativeEmailSend$(req: LoginReqDtoModel): Observable<BaseMessageModel> {
    return this._httpClient.post<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/user/mfa/alternative/email`,
      req
    );
  }

  alternativeEmailValidateToken$(
    token: string,
    req: LoginReqDtoModel
  ): Observable<LoginResDtoModel> {
    return this._httpClient.patch<LoginResDtoModel>(
      `${this._infraApiPath}/api/v1/user/mfa/alternative/email/${token}/validate`,
      req
    );
  }
}
