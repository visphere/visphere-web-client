/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: change-password-form.component.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 20:59:40
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
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChangePasswordService } from '~/auth-mod/services/change-password/change-password.service';
import { ChangePasswordFormStage } from '~/auth-mod/types/form-stage.type';
import { PasswordStrengthMeterComponent } from '~/shared-mod/components/password-strength-meter/password-strength-meter.component';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';
import { passwordMatchValidator } from '~/shared-mod/validators/password-match.validator';
import { regex } from '~/shared-mod/validators/regex.constant';

@Component({
  selector: 'msph-change-password-form',
  templateUrl: './change-password-form.component.html',
  providers: [ChangePasswordService, PopulateFormGroupService],
})
export class ChangePasswordFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('meter') strengthMeter!: PasswordStrengthMeterComponent;

  changePasswordForm: FormGroup;

  isLoading$: Observable<boolean> = this._changePasswordService.isLoading$;
  currentStage$: Observable<ChangePasswordFormStage> =
    this._changePasswordService.currentStage$;

  constructor(
    private readonly _changePasswordService: ChangePasswordService,
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    super();
    this.changePasswordForm = new FormGroup(
      {
        newPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(regex.PASSWORD),
        ]),
        confirmedNewPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: passwordMatchValidator(
          'newPassword',
          'confirmedNewPassword'
        ),
      }
    );
    this._changePasswordService.setReactiveForm(this.changePasswordForm);
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.changePasswordForm);
    this.wrapAsObservable(this._changePasswordService.isLoading$).subscribe(
      isLoading => this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitChangePasswordForm(): void {
    this._changePasswordService.submitForm();
  }

  ngAfterViewInit(): void {
    this.strengthMeter.debounceCalcStrength();
  }
}
