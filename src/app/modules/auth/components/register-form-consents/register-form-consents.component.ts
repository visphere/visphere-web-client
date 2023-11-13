/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { SanitizePipe } from '~/shared-mod/pipes/sanitize/sanitize.pipe';
import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';
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
  controls = [
    { name: 'allowNotifs', isRequired: false },
    { name: 'enabledMfa', isRequired: false },
    { name: 'agreeTerms', isRequired: true },
  ];
  someNoSelected = true;
  allSelected = false;

  formDisabled$: Observable<boolean> =
    this._populateFormGroupService.formDisabled$;

  constructor(
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _formHelperService: FormHelperService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable(this._populateFormGroupService.field$).subscribe(
      formGroup => {
        this.formGroup = formGroup;
      }
    );
    this.wrapAsObservable(this.formGroup.valueChanges).subscribe(() => {
      const { someNoSelected, allSelected } =
        this._formHelperService.boolFormDetails(this.formGroup, this.controls);
      this.someNoSelected = someNoSelected;
      this.allSelected = allSelected;
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleToggleAllValues(): void {
    this.selectAllToggle = !this.selectAllToggle;
    this._formHelperService.toggleAllBoolValues(
      this.formGroup,
      this.controls,
      this.selectAllToggle
    );
  }

  handleClickCheckbox(): void {
    if (this.someNoSelected) {
      this.selectAllToggle = false;
    }
    if (this.allSelected) {
      this.selectAllToggle = true;
    }
  }
}
