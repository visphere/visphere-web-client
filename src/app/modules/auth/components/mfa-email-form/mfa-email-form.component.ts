/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MfaEmailService } from '~/auth-mod/services/mfa-email/mfa-email.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-mfa-email-form',
  templateUrl: './mfa-email-form.component.html',
  providers: [MfaEmailService, PopulateFormGroupService],
})
export class MfaEmailFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  tokenForm: FormGroup;

  isLoading$: Observable<boolean> = this._mfaEmailService.isLoading$;
  isSending$: Observable<boolean> = this._mfaEmailService.isSending$;

  constructor(
    private readonly _mfaEmailService: MfaEmailService,
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    super();
    this.tokenForm = new FormGroup({
      token: new FormControl('', [Validators.required]),
    });
    this._mfaEmailService.setReactiveForm(this.tokenForm);
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.tokenForm);
    this.wrapAsObservable(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSendEmailMessage(): void {
    this.wrapAsObservable(this._mfaEmailService.sendEmailMessage()).subscribe();
  }

  handleSubmitTokenForm(): void {
    this.wrapAsObservable(this._mfaEmailService.submitForm()).subscribe({
      next: () => this.tokenForm.reset(),
      error: () => this.tokenForm.reset(),
    });
  }
}
