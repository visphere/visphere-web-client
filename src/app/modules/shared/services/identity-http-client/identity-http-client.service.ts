/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import {
  LoginResDtoModel,
  RefreshTokenReqDto,
  RefreshTokenResDto,
} from '~/shared-mod/models/identity.model';
import { AbstractHttpProvider } from '../abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class IdentityHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  loginViaAccessToken$(refreshToken: string): Observable<LoginResDtoModel> {
    const headers = new HttpHeaders({
      'X-RefreshToken': refreshToken,
    });
    return this._httpClient.post<LoginResDtoModel>(
      `${this._infraApiPath}/api/v1/user/identity/login/token`,
      null,
      { headers }
    );
  }

  refrehToken$(req: RefreshTokenReqDto): Observable<RefreshTokenResDto> {
    return this._httpClient.patch<RefreshTokenResDto>(
      `${this._infraApiPath}/api/v1/user/identity/refresh`,
      req
    );
  }

  logout$(refreshToken: string): Observable<BaseMessageModel> {
    const headers = new HttpHeaders({
      'X-RefreshToken': refreshToken,
    });
    return this._httpClient.delete<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/user/identity/logout`,
      { headers }
    );
  }
}
