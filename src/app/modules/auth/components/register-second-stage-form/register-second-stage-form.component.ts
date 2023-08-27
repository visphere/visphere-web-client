/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: register-second-stage-form.component.ts
 *   Created at: 2023-08-26, 16:03:09
 *   Last updated at: 2023-08-26, 16:03:09
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
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegisterService } from '~/auth-mod/services/register/register.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';

@Component({
  selector: 'msph-register-second-stage-form',
  templateUrl: './register-second-stage-form.component.html',
  providers: [PopulateFormGroupService],
})
export class RegisterSecondStageFormComponent implements OnInit {
  rootForm: FormGroup;
  secondStageForm: FormGroup;

  isLoading$: Observable<boolean> = this._registerService.isLoading$;

  constructor(
    private readonly _registerService: RegisterService,
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    this.rootForm = this._registerService.rootForm;
    this.secondStageForm = this._registerService.getFormGroupStage('second');
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.secondStageForm);
  }

  handleGotoPreviousStage(): void {
    this._registerService.setFormStage('first');
  }

  get checkIfFormIsInvalid(): boolean {
    return this._registerService.checkIfFormIsInvalid();
  }
}
