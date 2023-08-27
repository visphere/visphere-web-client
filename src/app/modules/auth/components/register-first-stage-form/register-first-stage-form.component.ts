/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: register-first-stage-form.component.ts
 *   Created at: 2023-08-26, 16:02:57
 *   Last updated at: 2023-08-26, 16:02:57
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
import { FormGroup } from '@angular/forms';
import { RegisterService } from '~/auth-mod/services/register/register.service';
import { PasswordStrengthMeterComponent } from '~/shared-mod/components/password-strength-meter/password-strength-meter.component';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'msph-register-first-stage-form',
  templateUrl: './register-first-stage-form.component.html',
  providers: [PopulateFormGroupService],
})
export class RegisterFirstStageFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('meter') strengthMeter!: PasswordStrengthMeterComponent;

  rootForm: FormGroup;
  firstStageForm: FormGroup;

  constructor(
    private readonly _registerService: RegisterService,
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    super();
    this.rootForm = this._registerService.rootForm;
    this.firstStageForm = this._registerService.getFormGroupStage('first');
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.firstStageForm);
    this.wrapAsObservable(this._registerService.isLoading$).subscribe(
      isLoading => this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  ngAfterViewInit(): void {
    this.strengthMeter?.debounceCalcStrength();
  }

  handleGotoSecondStage(): void {
    this._registerService.setFormStage('second');
  }
}
