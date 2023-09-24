/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { combineLatest } from 'rxjs';
import { PopulateFormControlService } from '~/shared-mod/context/populate-form-control/populate-form-control.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'msph-auth-checkbox-form-input',
  templateUrl: './auth-checkbox-form-input.component.html',
  providers: [PopulateFormControlService],
})
export class AuthCheckboxFormInputComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() i18nPrefix!: string;
  @Input() formControlIdentifier!: string;
  @Input() additionalInfo = false;

  formGroup!: FormGroup;
  tooltipProps: NgxTippyProps = {
    placement: 'top',
    theme: 'msph-auth',
    animation: 'scale-subtle',
  };
  i18nInfo = '';

  constructor(
    private readonly _formHelperService: FormHelperService,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _populateFormControlService: PopulateFormControlService
  ) {
    super();
  }

  ngOnInit(): void {
    this.i18nInfo = `msph.${this.i18nPrefix}.formFields.${this.formControlIdentifier}.info`;
    this._populateFormControlService.setFields(
      this.formControlIdentifier,
      this.i18nPrefix
    );
    this.wrapAsObservable(
      combineLatest([
        this._populateFormGroupService.field$,
        this._populateFormGroupService.formDisabled$,
      ])
    ).subscribe(([formGroup, formDisabled]) => {
      this.formGroup = formGroup;
      this._formHelperService.toggleFormField(
        formGroup,
        this.formControlIdentifier,
        formDisabled
      );
    });
  }
  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSetDirtyAndTouched(): void {
    const control = this.formGroup.get(this.formControlIdentifier);
    control?.markAsDirty();
    control?.markAsTouched();
  }
}
