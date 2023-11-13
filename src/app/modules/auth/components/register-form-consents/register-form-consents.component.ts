/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { SanitizePipe } from '~/shared-mod/pipes/sanitize/sanitize.pipe';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-register-form-consents',
  templateUrl: './register-form-consents.component.html',
  providers: [SanitizePipe],
})
export class RegisterFormConsentsComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  selectAllToggle = false;
  formGroup!: FormGroup;

  formDisabled$: Observable<boolean> =
    this._populateFormGroupService.formDisabled$;

  constructor(
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable(this._populateFormGroupService.field$).subscribe(
      formGroup => {
        this.formGroup = formGroup;
      }
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleToggleAllValues(): void {
    const allowNotifsControl = this.formGroup.get('allowNotifs');
    const enabledMfaControl = this.formGroup.get('enabledMfa');
    const agreeTermsControl = this.formGroup.get('agreeTerms');
    if (!allowNotifsControl || !agreeTermsControl || !enabledMfaControl) {
      return;
    }
    this.selectAllToggle = !this.selectAllToggle;
    allowNotifsControl.patchValue(this.selectAllToggle);
    enabledMfaControl.patchValue(this.selectAllToggle);
    agreeTermsControl.patchValue(this.selectAllToggle);
    agreeTermsControl.setErrors(
      this.selectAllToggle ? null : { required: true }
    );
  }
}
