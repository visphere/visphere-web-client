/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { PopulateFormControlService } from '~/shared-mod/context/populate-form-control/populate-form-control.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'msph-auth-common-form-input',
  templateUrl: './auth-common-form-input.component.html',
  providers: [PopulateFormControlService],
})
export class AuthCommonFormInputComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() formControlIdentifier!: string;
  @Input() i18nPrefix!: string;
  @Input() maxLength!: number;
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() requiredStar = false;

  formGroup!: FormGroup;
  i18nLabel = '';

  formDisabled$: Observable<boolean> =
    this._populateFormGroupService.formDisabled$;

  constructor(
    private readonly _formHelperService: FormHelperService,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _populateFormControlService: PopulateFormControlService
  ) {
    super();
  }

  ngOnInit(): void {
    this.i18nLabel = `msph.${this.i18nPrefix}Page.formFields.${this.formControlIdentifier}.value`;
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

  isFieldInvalid(): boolean {
    return this._formHelperService.validateField(
      this.formGroup,
      this.formControlIdentifier
    );
  }
}
