/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MfaCodeService } from '~/auth-mod/services/mfa-code/mfa-code.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';
import { exactLengthValidator } from '~/shared-mod/validators/exact-length.validator';
import { regex } from '~/shared-mod/validators/regex.constant';

@Component({
  selector: 'vsph-mfa-code-form',
  templateUrl: './mfa-code-form.component.html',
  providers: [MfaCodeService, PopulateFormGroupService],
})
export class MfaCodeFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() firstSetup = false;

  codeForm: FormGroup;
  isLoading$: Observable<boolean> = this._mfaCodeService.isLoading$;

  constructor(
    private readonly _mfaCodeService: MfaCodeService,
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    super();
    this.codeForm = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.pattern(regex.MFA_CODE),
        exactLengthValidator(6),
      ]),
    });
    this._mfaCodeService.setReactiveForm(this.codeForm);
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.codeForm);
    this._mfaCodeService.setFirstSetup(this.firstSetup);
    this.wrapAsObservable(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitCodeForm(): void {
    this.wrapAsObservable(this._mfaCodeService.submitForm()).subscribe({
      next: () => this.codeForm.reset(),
      error: () => this.codeForm.reset(),
    });
  }
}
