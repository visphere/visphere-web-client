/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordConfirmationReqDto } from '~/settings-mod/model/password-confirmation.model';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class DevastateAccountHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  disableAccount$(
    reqDto: PasswordConfirmationReqDto
  ): Observable<BaseMessageModel> {
    return this._httpClient.post<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/auth/account/disable`,
      reqDto
    );
  }

  deleteAccount$(
    reqDto: PasswordConfirmationReqDto
  ): Observable<BaseMessageModel> {
    return this._httpClient.delete<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/auth/account/delete`,
      { body: reqDto }
    );
  }
}