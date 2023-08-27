/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: change-password.service.ts
 *   Created at: 2023-08-27, 01:08:45
 *   Last updated at: 2023-08-27, 01:08:45
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
import { ChangePasswordFormModel } from '~/auth-mod/models/change-password-form.model';
import { AuthHttpClientService } from '~/auth-mod/services/auth-http-service/auth-http-client.service';
import { ChangePasswordFormStage } from '~/auth-mod/types/form-stage.type';
import { AbstractSimpleFormStateProvider } from '~/shared-mod/services/abstract-simple-form-state-provider';

@Injectable()
export class ChangePasswordService extends AbstractSimpleFormStateProvider<ChangePasswordFormStage> {
  constructor(private readonly _authHttpClientService: AuthHttpClientService) {
    super('change');
  }

  override abstractSubmitForm(): void {
    const data = this.parseFormValues<ChangePasswordFormModel>();
    // next
    console.log(data);
    // success
    this._currentStage$.next('success');
  }
}
