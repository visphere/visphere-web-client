/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auth-single-select-spinner.component.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 20:59:13
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { dropboxFadeAndMove } from '~/shared-mod/animations/dropbox.animation';
import { PopulateFormControlService } from '~/shared-mod/context/populate-form-control/populate-form-control.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { FormHelperService } from '~/shared-mod/services/form-helper/form-helper.service';
import { SpinnerListElementType } from '~/shared-mod/types/spinner-list-element.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'msph-auth-single-select-spinner',
  templateUrl: './auth-single-select-spinner.component.html',
  animations: [dropboxFadeAndMove],
})
export class AuthSingleSelectSpinnerComponent
  extends AbstractReactiveProvider
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() multiSpinnerId!: string;
  @Input() initValueId!: number | null;
  @Input() listElements: SpinnerListElementType[] = [];

  @Output() persistElement: EventEmitter<SpinnerListElementType | null> =
    new EventEmitter();

  @ViewChild('selectViewHolder') selectViewHolder!: ElementRef;
  @ViewChild('inputElement') inputElement!: ElementRef;

  itemsListIsOpen = false;
  isTouched = false;
  formGroup!: FormGroup;
  filteredList: SpinnerListElementType[] = [];
  formControlName = '';
  i18nPlaceholder = '';
  formDisabled = false;

  constructor(
    private readonly _formHelperService: FormHelperService,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _populateFormControlService: PopulateFormControlService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable(
      combineLatest([
        this._populateFormGroupService.field$,
        this._populateFormControlService.fields$,
        this._populateFormGroupService.formDisabled$,
      ])
    ).subscribe(([formGroup, populateData, formDisabled]) => {
      const [formControlName, i18nPrefix] = populateData;
      this.formGroup = formGroup;
      this.formControlName = formControlName;
      this.formDisabled = formDisabled;
      this._formHelperService.toggleFormField(
        formGroup,
        formControlName,
        formDisabled
      );
      this.i18nPlaceholder = `msph.${i18nPrefix}Page.formFields.${formControlName}.placeholder`;
      if (this.multiSpinnerId) {
        this.i18nPlaceholder += `s.${this.multiSpinnerId}`;
      }
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['listElements']) return;
    this.filteredList = changes['listElements'].currentValue;
    this.setInitialValue();
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  @HostListener('document:click', ['$event'])
  onClickOnDocument(event: MouseEvent): void {
    if (this.selectViewHolder.nativeElement.contains(event.target)) return;
    this.itemsListIsOpen = false;

    if (
      !this.listElements.find(
        e => e.value === this.inputElement.nativeElement.value
      )
    ) {
      this.inputElement.nativeElement.value = '';
      this.handleFilterElements('');
      if (this.isTouched) this.persistElement.emit(null);
    }
  }

  handleShowItemsList(): void {
    this.itemsListIsOpen = true;
    this.isTouched = true;
    this.formGroup.get(this.formControlName)?.markAsTouched();
  }

  handleFilterElements(phrase: string): void {
    this.inputElement.nativeElement.value = phrase;
    this.filteredList = this.listElements.filter(
      v => v.value.toLowerCase().includes(phrase.toLowerCase()) || phrase === ''
    );
  }

  handleSelectItem(element: SpinnerListElementType): void {
    this.itemsListIsOpen = false;
    this.inputElement.nativeElement.value = element.value;
    this.persistElement.emit(element);
  }

  private setInitialValue(): void {
    const initValue = this.filteredList.find(e => e.id === this.initValueId);
    if (!initValue || !this.inputElement) return;
    this.inputElement.nativeElement.value = initValue.value;
  }

  get hasErrors(): boolean {
    return Boolean(this.formGroup.get(this.formControlName)?.errors);
  }
}
