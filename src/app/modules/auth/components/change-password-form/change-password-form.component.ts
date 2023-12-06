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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChangePasswordService } from '~/auth-mod/services/change-password/change-password.service';
import { PasswordStrengthMeterComponent } from '~/shared-mod/components/password-strength-meter/password-strength-meter.component';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';
import { passwordMatchValidator } from '~/shared-mod/validators/password-match.validator';
import { regex } from '~/shared-mod/validators/regex.constant';

@Component({
  selector: 'vsph-change-password-form',
  templateUrl: './change-password-form.component.html',
  providers: [ChangePasswordService, PopulateFormGroupService],
})
export class ChangePasswordFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('meter') strengthMeter!: PasswordStrengthMeterComponent;

  changePasswordForm: FormGroup;

  isLoading$ = this._changePasswordService.isLoading$;
  currentStage$ = this._changePasswordService.currentStage$;

  constructor(
    private readonly _changePasswordService: ChangePasswordService,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _activatedRoute: ActivatedRoute
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
    const token = this._activatedRoute.snapshot.paramMap.get('token') || '';
    this._changePasswordService.setToken(token);
    this.wrapAsObservable$(
      this._changePasswordService.validateToken$(token)
    ).subscribe();
    this._populateFormGroupService.setField(this.changePasswordForm);
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitChangePasswordForm(): void {
    this.wrapAsObservable$(
      this._changePasswordService.submitForm$()
    ).subscribe();
  }

  ngAfterViewInit(): void {
    this.strengthMeter.debounceCalcStrength();
  }
}
