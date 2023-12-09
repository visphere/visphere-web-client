/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdatableEmailService } from '~/settings-mod/services/updatable-email/updatable-email.service';
import { AccountValueForAnotherExistValidator } from '~/settings-mod/validators/account-value-for-another-exist.validator';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-updatable-email-start-form',
  templateUrl: './updatable-email-start-form.component.html',
  providers: [PopulateFormGroupService],
})
export class UpdatableEmailStartFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnChanges, OnDestroy
{
  @Input() initValue = '';
  @Input() isUnique = true;

  emailAddressForm?: FormGroup;

  isLoading$ = this._updatableEmailService.isLoading$;
  i18nPrefix$ = this._updatableEmailService.i18nPrefix$;

  constructor(
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _updatableEmailService: UpdatableEmailService,
    private readonly _accountValueForAnotherExistValidator: AccountValueForAnotherExistValidator
  ) {
    super();
  }

  ngOnInit(): void {
    this.emailAddressForm = new FormGroup({
      emailAddress: new FormControl(
        this.initValue,
        [Validators.required, Validators.email],
        this.isUnique
          ? [this._accountValueForAnotherExistValidator.validate('email')]
          : []
      ),
    });
    this._updatableEmailService.setReactiveForm(this.emailAddressForm);
    this._populateFormGroupService.setField(this.emailAddressForm);
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const simpleChange = changes['initValue'];
    if (simpleChange) {
      this.emailAddressForm
        ?.get('emailAddress')
        ?.patchValue(simpleChange.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitStartChangeEmailForm(): void {
    this.wrapAsObservable$(
      this._updatableEmailService.submitForm$()
    ).subscribe();
  }

  get contentsAreIdentical(): boolean {
    return this.emailAddressForm?.get('emailAddress')?.value === this.initValue;
  }
}
