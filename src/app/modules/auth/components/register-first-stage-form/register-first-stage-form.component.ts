/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
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
  selector: 'vsph-register-first-stage-form',
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
