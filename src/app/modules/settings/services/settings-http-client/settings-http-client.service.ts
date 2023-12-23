/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserNotifSettingsResDto } from '~/settings-mod/model/notifs.model';
import { RelatedValueReqDto } from '~/settings-mod/model/related-value.model';
import {
  UpdateAccountDetailsReqDto,
  UpdateAccountDetailsResDto,
} from '~/settings-mod/model/update-account-details.model';
import { UpdateAccountPasswordReqDto } from '~/settings-mod/model/update-account-password.model';
import { UserAccountDetailsResDto } from '~/settings-mod/model/user-account-details.model';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { UserSettings } from '~/shared-mod/models/identity.model';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';

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

  getUserNotifSettings$(): Observable<UserNotifSettingsResDto> {
    return this._httpClient.get<UserNotifSettingsResDto>(
      `${this._infraApiPath}/api/v1/notification/user/settings/email`
    );
  }

  updateMfaStateSettings$(enabled: boolean): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/user/mfa/settings/toggle`,
      null,
      { params: { enabled } }
    );
  }

  getAccountDetails$(): Observable<UserAccountDetailsResDto> {
    return this._httpClient.get<UserAccountDetailsResDto>(
      `${this._infraApiPath}/api/v1/user/account/details`
    );
  }

  updateAccountDetails$(
    reqDto: UpdateAccountDetailsReqDto
  ): Observable<UpdateAccountDetailsResDto> {
    return this._httpClient.patch<UpdateAccountDetailsResDto>(
      `${this._infraApiPath}/api/v1/user/account/details`,
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
      `${this._infraApiPath}/api/v1/user/password/renew/logged/change`,
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

  updateEmailNotifsState$(enabled: boolean): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/notification/user/settings/email`,
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
      `${this._infraApiPath}/api/v1/user/mfa/reset`,
      { headers, params: { logoutFromAll } }
    );
  }
}
