/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  UpdateUserAccountDataReqDto,
  UserDataFillFormResDto,
} from '~/auth-mod/models/oauth2-data.model';
import { LoginResDtoModel } from '~/shared-mod/models/identity.model';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class Oauth2HttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getUserDataForFillForm$(token: string): Observable<UserDataFillFormResDto> {
    return this._httpClient.get<UserDataFillFormResDto>(
      `${this._infraApiPath}/api/v1/oauth2/user/data`,
      { params: { token } }
    );
  }

  updateUserAccountData$(
    token: string,
    req: UpdateUserAccountDataReqDto
  ): Observable<LoginResDtoModel> {
    return this._httpClient.patch<LoginResDtoModel>(
      `${this._infraApiPath}/api/v1/oauth2/user/data/fill`,
      req,
      { params: { token } }
    );
  }

  loginViaProvider$(token: string): Observable<LoginResDtoModel> {
    return this._httpClient.post<LoginResDtoModel>(
      `${this._infraApiPath}/api/v1/oauth2/user/login`,
      null,
      { params: { token } }
    );
  }
}
