/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: activate-account-form.component.ts
 *   Created at: 2023-08-25, 22:00:33
 *   Last updated at: 2023-08-25, 22:00:33
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
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivateAccountService } from '~/auth-mod/services/activate-account/activate-account.service';
import * as NgrxSelector_ATH from '~/auth-mod/store/selectors';
import { ActivateAccountFormStage } from '~/auth-mod/types/form-stage.type';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { exactLengthValidator } from '~/shared-mod/validators/exact-length.validator';
import { regex } from '~/shared-mod/validators/regex.constant';

@Component({
  selector: 'msph-activate-account-form',
  templateUrl: './activate-account-form.component.html',
  providers: [PopulateFormGroupService, ActivateAccountService],
})
export class ActivateAccountFormComponent {
  activateAccountForm: FormGroup;

  userEmail$: Observable<string> = this._store.select(
    NgrxSelector_ATH.selectActivateAccountEmail
  );
  isLoading$: Observable<boolean> = this._activateAccountService.isLoading$;
  currentStage$: Observable<ActivateAccountFormStage> =
    this._activateAccountService.currentStage$;

  constructor(
    private readonly _store: Store<AuthReducer>,
    private readonly _activateAccountService: ActivateAccountService,
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    this.activateAccountForm = new FormGroup({
      token: new FormControl('', [
        Validators.required,
        Validators.pattern(regex.OTA_TOKEN),
        exactLengthValidator(10),
      ]),
    });
    this._populateFormGroupService.setField(this.activateAccountForm);
    this._activateAccountService.setReactiveForm(this.activateAccountForm);
  }

  handleSubmitactivateAccountForm(): void {
    this._activateAccountService.submitForm();
  }

  handleResendMessage(): void {
    this._activateAccountService.resendEmailMessage();
  }

  handleReturnToLoginAndClearState(): void {
    this._activateAccountService.returnToLoginAndClearState();
  }
}
