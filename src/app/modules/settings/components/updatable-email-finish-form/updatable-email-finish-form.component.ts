/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyAccountSettingsService } from '~/settings-mod/services/my-account-settings/my-account-settings.service';
import { UpdatableEmailService } from '~/settings-mod/services/updatable-email/updatable-email.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-updatable-email-finish-form',
  templateUrl: './updatable-email-finish-form.component.html',
  providers: [PopulateFormGroupService],
})
export class UpdatableEmailFinishFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  tokenForm: FormGroup;

  isLoading$ = this._updatableEmailService.isLoading$;
  i18nPrefix$ = this._updatableEmailService.i18nPrefix$;
  isResendLoading$ = this._updatableEmailService.isResendLoading$;

  constructor(
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _updatableEmailService: UpdatableEmailService,
    private readonly _myAccountSettingsService: MyAccountSettingsService
  ) {
    super();
    this.tokenForm = new FormGroup({
      token: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.tokenForm);
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitTokenForm(): void {
    const token = this.tokenForm.get('token')?.value || '';
    this.wrapAsObservable$(
      this._updatableEmailService.validateAndChangeEmail$(token)
    ).subscribe({
      next: () => {
        this._myAccountSettingsService.updateWsSignalValue();
        this._myAccountSettingsService.closeModal();
      },
    });
  }

  handleResendMessage(): void {
    this.wrapAsObservable$(
      this._updatableEmailService.resendTokenForValidateEmail$()
    ).subscribe();
  }
}
