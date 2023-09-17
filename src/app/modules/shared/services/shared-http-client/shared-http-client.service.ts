/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { CheckUsernameExistResDtoModel } from '~/shared-mod/models/check-username-exist.model';
import {
  IpAddressModel,
  VerifyCaptchaModel,
} from '~/shared-mod/models/verify-captcha.model';
import { AbstractHttpProvider } from '../abstract-http-provider';

@Injectable({ providedIn: 'root' })
export class SharedHttpClientService extends AbstractHttpProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getClientIpAddress(): Observable<IpAddressModel> {
    return this._httpClient.get<IpAddressModel>(
      `http://api.ipify.org/?format=json`
    );
  }

  verifyCaptcha(req: VerifyCaptchaModel): Observable<BaseMessageModel> {
    return this._httpClient.post<BaseMessageModel>(
      `${this._infraApiPath}/api/v1/misc/captcha/verify`,
      req
    );
  }
}
