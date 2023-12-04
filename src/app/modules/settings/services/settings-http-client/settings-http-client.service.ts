/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelatedValueReqDto } from '~/settings-mod/model/related-value.model';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractHttpProvider } from '~/shared-mod/services/abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class SettingsHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  relateLangWithUser(reqDto: RelatedValueReqDto): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/settings/user/relate/lang`,
      reqDto
    );
  }

  relateThemeWithUser(
    reqDto: RelatedValueReqDto
  ): Observable<BaseMessageModel> {
    return this._httpClient.patch<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/settings/user/relate/theme`,
      reqDto
    );
  }
}
