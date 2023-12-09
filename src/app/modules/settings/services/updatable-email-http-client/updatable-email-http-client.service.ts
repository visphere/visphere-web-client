/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailVariant } from '~/settings-mod/types/updatable-modal.type';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class UpdatableEmailHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  sendRequestForChangeEmailAddress$<T>(
    reqDto: T,
    variant: EmailVariant,
    isResend: boolean
  ): Observable<BaseMessageModel> {
    return this._httpClient.post<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/auth/email/${variant}/request${
        isResend ? '/resend' : ''
      }`,
      reqDto
    );
  }

  validateTokenAndChangeEmailAddress$<T>(
    reqDto: T,
    token: string,
    variant: EmailVariant
  ): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/auth/email/${variant}/${token}`,
      reqDto
    );
  }

  deleteSecondEmailAddress$(): Observable<BaseMessageModel> {
    return this._httpClient.delete<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/auth/email/second`
    );
  }
}
