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
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ISpinnerListElementType } from '~/shared-mod/types/spinner-list-element.type';

@Component({
  selector: 'msph-auth-single-select-spinner',
  templateUrl: './auth-single-select-spinner.component.html',
})
export class AuthSingleSelectSpinnerComponent
  implements OnChanges, AfterViewInit
{
  @ViewChild('selectViewHolder') selectViewHolder!: ElementRef;
  @ViewChild('inputElement') inputElement!: ElementRef;

  @Input() formGroup!: FormGroup;
  @Input() formControlIdentifier!: string;
  @Input() initIdValue!: number | null;
  @Input() i18nPlaceholder = '';
  @Input() listElements: ISpinnerListElementType[] = [];
  @Output() persistElement: EventEmitter<ISpinnerListElementType | null> =
    new EventEmitter();

  itemsListIsOpen = false;
  isTouched = false;
  filteredList: ISpinnerListElementType[] = [];

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
    this.formGroup.get(this.formControlIdentifier)?.markAsTouched();
  }

  handleFilterElements(phrase: string): void {
    this.inputElement.nativeElement.value = phrase;
    this.filteredList = this.listElements.filter(
      v => v.value.toLowerCase().includes(phrase.toLowerCase()) || phrase === ''
    );
  }

  handleSelectItem(element: ISpinnerListElementType): void {
    this.itemsListIsOpen = false;
    this.inputElement.nativeElement.value = element.value;
    this.persistElement.emit(element);
  }

  private setInitialValue(): void {
    const initValue = this.filteredList.find(e => e.id === this.initIdValue);
    if (!initValue || !this.inputElement) return;
    this.inputElement.nativeElement.value = initValue.value;
  }

  get hasErrors(): boolean {
    return Boolean(this.formGroup.get(this.formControlIdentifier)?.errors);
  }
}
