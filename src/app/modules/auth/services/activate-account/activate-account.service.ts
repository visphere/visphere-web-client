/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: activate-account.service.ts
 *   Created at: 2023-08-27, 01:36:08
 *   Last updated at: 2023-08-27, 01:36:08
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
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ActivateAccountFormModel } from '~/auth-mod/models/activate-account-form.model';
import * as NgrxAction_ATH from '~/auth-mod/store/actions';
import * as NgrxSelector_ATH from '~/auth-mod/store/selectors';
import { ActivateAccountFormStage } from '~/auth-mod/types/form-stage.type';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { AbstractSimpleFormStateProvider } from '~/shared-mod/services/abstract-simple-form-state-provider';

@Injectable()
export class ActivateAccountService
  extends AbstractSimpleFormStateProvider<ActivateAccountFormStage>
  implements OnDestroy
{
  userEmail = '';

  constructor(
    private readonly _store: Store<AuthReducer>,
    private readonly _router: Router
  ) {
    super('activate');
    this.wrapAsObservable(
      this._store.select(NgrxSelector_ATH.selectActivateAccountEmail)
    ).subscribe(userEmail => (this.userEmail = userEmail));
  }

  ngOnDestroy(): void {
    this._store.dispatch(NgrxAction_ATH.__removeActivateAccountEmail());
    this.unmountAllSubscriptions();
  }

  override abstractSubmitForm(): void {
    const data = this.parseFormValues<ActivateAccountFormModel>();
    // next
    console.log(data, this.userEmail);
    // success
    this._currentStage$.next('success');
  }

  async returnToLoginAndClearState(): Promise<void> {
    this._store.dispatch(NgrxAction_ATH.__removeActivateAccountEmail());
    await this._router.navigate(['/auth/login']);
  }

  resendEmailMessage(): void {
    console.log('resend email message');
  }
}
