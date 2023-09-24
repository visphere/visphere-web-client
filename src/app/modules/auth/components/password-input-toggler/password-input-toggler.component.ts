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
import { SanitizePipe } from '~/shared-mod/pipes/sanitize/sanitize.pipe';
import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'msph-password-input-toggler',
  templateUrl: './password-input-toggler.component.html',
  providers: [SanitizePipe, PopulateFormControlService],
})
export class PasswordInputTogglerComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() formControlIdentifier!: string;
  @Input() maxLength = 80;
  @Input() placeholder = '';
  @Input() i18nPrefix!: string;
  @Input() requiredStar = false;
  @Input() additionalInfo = false;

  formGroup!: FormGroup;
  i18nLabel = '';
  isVisible = false;
  capsLockIsOn = false;
  formDisabled = false;
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
    const baseI18nFormControlName = `msph.${this.i18nPrefix}.formFields.${this.formControlIdentifier}`;
    this.i18nLabel = `${baseI18nFormControlName}.value`;
    this.i18nInfo = `${baseI18nFormControlName}.info`;
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
      this.formDisabled = formDisabled;
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

  onChangeVisibility(inputData: string): void {
    if (inputData === '') return;
    this.isVisible = !this.isVisible;
  }

  onChangeInputData(inputData: string): void {
    if (inputData !== '') return;
    this.isVisible = false;
  }

  checkCapsLock(event: KeyboardEvent): void {
    this.capsLockIsOn = event.getModifierState('CapsLock');
  }

  isFieldInvalid(): boolean {
    return this._formHelperService.validateField(
      this.formGroup,
      this.formControlIdentifier
    );
  }
}
