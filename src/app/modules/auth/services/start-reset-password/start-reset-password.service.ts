/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: start-reset-password.service.ts
 *   Created at: 2023-08-27, 00:05:35
 *   Last updated at: 2023-08-27, 00:05:35
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
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StartResetPasswordViaEmailFormModel } from '~/auth-mod/models/reset-password-form.model';
import { AuthHttpClientService } from '~/auth-mod/services/auth-http-client/auth-http-client.service';
import { ResetPasswordService } from '~/auth-mod/services/reset-password/reset-password.service';
import { AbstractSimpleFormProvider } from '~/shared-mod/services/abstract-simple-form-provider';

@Injectable()
export class StartResetPasswordService extends AbstractSimpleFormProvider<void> {
  constructor(
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _resetPasswordService: ResetPasswordService
  ) {
    super();
  }

  override abstractSubmitForm(): Observable<void> {
    const data = this.parseFormValues<StartResetPasswordViaEmailFormModel>();
    // next
    console.log(data);
    // on success
    this._resetPasswordService.setCurrentStage('token');
    this._resetPasswordService.setUserEmail('development@example.com');

    return of();
  }
}
