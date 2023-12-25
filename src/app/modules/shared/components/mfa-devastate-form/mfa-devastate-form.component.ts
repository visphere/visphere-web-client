/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { PasswordConfirmationService } from '~/shared-mod/services/password-confirmation/password-confirmation.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-mfa-devastate-form',
  templateUrl: './mfa-devastate-form.component.html',
  providers: [PopulateFormGroupService],
})
export class MfaDevastateFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() i18nButtonText = '';
  @Output() emitMfa = new EventEmitter<string>();

  mfaCodeForm: FormGroup;
  isLoading$ = this._passwordConfirmationService.isLoading$;

  constructor(
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _passwordConfirmationService: PasswordConfirmationService
  ) {
    super();
    this.mfaCodeForm = new FormGroup({
      mfaCode: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.mfaCodeForm);
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleGotoPreviousStage(): void {
    this._passwordConfirmationService.returnToPassword();
  }

  handleSubmitMfaCodeForm(): void {
    const { mfaCode } = this.mfaCodeForm.getRawValue();
    this.emitMfa.emit(mfaCode);
  }
}
