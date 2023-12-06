/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FinishResetPasswordService } from '~/auth-mod/services/finish-reset-password/finish-reset-password.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-finish-reset-password-form',
  templateUrl: './finish-reset-password-form.component.html',
  providers: [FinishResetPasswordService, PopulateFormGroupService],
})
export class FinishResetPasswordFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  finishResetPasswordForm: FormGroup;

  isLoading$: Observable<boolean> = this._finishResetPasswordService.isLoading$;
  isResendLoading$: Observable<boolean> =
    this._finishResetPasswordService.resendIsLoading$;

  constructor(
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _finishResetPasswordService: FinishResetPasswordService
  ) {
    super();
    this.finishResetPasswordForm = new FormGroup({
      token: new FormControl('', [Validators.required]),
    });
    this._finishResetPasswordService.setReactiveForm(
      this.finishResetPasswordForm
    );
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.finishResetPasswordForm);
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitFinishResetPasswordForm(): void {
    this.wrapAsObservable$(
      this._finishResetPasswordService.submitForm$()
    ).subscribe();
  }

  handleResendMessage(): void {
    this.wrapAsObservable$(
      this._finishResetPasswordService.resendEmailMessage$()
    ).subscribe();
  }
}
