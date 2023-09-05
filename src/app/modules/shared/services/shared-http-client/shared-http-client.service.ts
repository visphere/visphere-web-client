/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: shared-http-client.service.ts
 *   Created at: 2023-09-04, 12:39:55
 *   Last updated at: 2023-09-04, 12:39:55
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
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
      `${this._infraApiPath}/api/v1/misc/captcha/verification`,
      req
    );
  }
}
