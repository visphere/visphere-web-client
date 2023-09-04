/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: register.service.ts
 *   Created at: 2023-08-26, 15:25:08
 *   Last updated at: 2023-08-26, 15:25:09
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
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RegisterFormModel } from '~/auth-mod/models/register-form.model';
import { AuthHttpClientService } from '~/auth-mod/services/auth-http-client/auth-http-client.service';
import * as NgrxAction_ATH from '~/auth-mod/store/actions';
import { RegisterFormStage } from '~/auth-mod/types/form-stage.type';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { AbstractMultistageFormProvider } from '~/shared-mod/services/abstract-multistage-form-provider';

@Injectable()
export class RegisterService extends AbstractMultistageFormProvider<
  RegisterFormStage,
  void
> {
  private _captchaModalState$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _router: Router,
    private readonly _store: Store<AuthReducer>
  ) {
    super('first');
  }

  activeCaptchaModal(): void {
    this._captchaModalState$.next(true);
  }

  checkIfFormIsInvalid(): boolean {
    const agreeTermsControl =
      this.getFormGroupStage('second').get('agreeTerms');
    if (!agreeTermsControl) {
      return true;
    }
    return (
      this.getFormGroupStage('first').invalid ||
      this.getFormGroupStage('second').invalid ||
      !agreeTermsControl.value
    );
  }

  override abstractSubmitForm(): Observable<void> {
    const data = this.parseFormValues<RegisterFormModel>();
    // next
    console.log(data);
    // success
    this._store.dispatch(
      NgrxAction_ATH.__setActivateAccountEmail({
        email: data.firstStage.emailAddress,
      })
    );
    this.moveToActivateAccount();

    return of();
  }

  private async moveToActivateAccount(): Promise<void> {
    await this._router.navigate([`/auth/activate-account`]);
  }

  getFormGroupStage(stage: RegisterFormStage): FormGroup {
    return this._rootForm.get(`${stage}Stage`) as FormGroup;
  }

  get captchaModalState$(): BehaviorSubject<boolean> {
    return this._captchaModalState$;
  }
}
