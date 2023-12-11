/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelatedValueReqDto } from '~/settings-mod/model/related-value.model';
import {
  UpdateAccountDetailsReqDto,
  UpdateAccountDetailsResDto,
} from '~/settings-mod/model/update-account-details.model';
import { UserAccountDetailsResDto } from '~/settings-mod/model/user-account-details.model';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { UserSettings } from '~/shared-mod/models/identity.model';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';
import { UpdateAccountPasswordReqDto } from '../../model/update-account-password.model';

@Injectable({ providedIn: 'root' })
export class SettingsHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getUserSettings$(): Observable<UserSettings> {
    return this._httpClient.get<UserSettings>(
      `${this._infraApiPath}/api/v1/settings/user/settings`
    );
  }

  updateMfaStateSettings$(enabled: boolean): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/auth/mfa/settings/toggle`,
      null,
      { params: { enabled } }
    );
  }

  getAccountDetails$(): Observable<UserAccountDetailsResDto> {
    return this._httpClient.get<UserAccountDetailsResDto>(
      `${this._infraApiPath}/api/v1/auth/account/details`
    );
  }

  updateAccountDetails$(
    reqDto: UpdateAccountDetailsReqDto
  ): Observable<UpdateAccountDetailsResDto> {
    return this._httpClient.patch<UpdateAccountDetailsResDto>(
      `${this._infraApiPath}/api/v1/auth/account/details`,
      reqDto
    );
  }

  updateAccountPassword$(
    reqDto: UpdateAccountPasswordReqDto,
    refreshToken: string
  ): Observable<BaseMessageModel> {
    const headers = new HttpHeaders({
      'X-RefreshToken': refreshToken,
    });
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/auth/password/renew/logged/change`,
      reqDto,
      { headers }
    );
  }

  relateLangWithUser$(
    reqDto: RelatedValueReqDto
  ): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/settings/user/relate/lang`,
      reqDto
    );
  }

  relateThemeWithUser$(
    reqDto: RelatedValueReqDto
  ): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/settings/user/relate/theme`,
      reqDto
    );
  }

  updateNotifsState$(enabled: boolean): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/settings/user/push/notifications`,
      null,
      { params: { enabled } }
    );
  }

  updateNotifsSoundState$(enabled: boolean): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/settings/user/push/notifications/sound`,
      null,
      { params: { enabled } }
    );
  }

  resetMfaSettings$(
    refreshToken: string,
    logoutFromAll: boolean
  ): Observable<BaseMessageModel> {
    const headers = new HttpHeaders({
      'X-RefreshToken': refreshToken,
    });
    return this._httpClient.delete<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/auth/mfa/reset`,
      { headers, params: { logoutFromAll } }
    );
  }
}
