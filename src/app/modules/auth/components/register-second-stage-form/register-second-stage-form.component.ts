/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegisterService } from '~/auth-mod/services/register/register.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-register-second-stage-form',
  templateUrl: './register-second-stage-form.component.html',
  providers: [PopulateFormGroupService],
})
export class RegisterSecondStageFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  rootForm: FormGroup;
  secondStageForm: FormGroup;

  isLoading$: Observable<boolean> = this._registerService.isLoading$;

  constructor(
    private readonly _registerService: RegisterService,
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    super();
    this.rootForm = this._registerService.rootForm;
    this.secondStageForm = this._registerService.getFormGroupStage('second');
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.secondStageForm);
    this.wrapAsObservable(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleGotoPreviousStage(): void {
    this._registerService.setFormStage('first');
  }

  get checkIfFormIsInvalid(): boolean {
    return this._registerService.checkIfFormIsInvalid();
  }
}
