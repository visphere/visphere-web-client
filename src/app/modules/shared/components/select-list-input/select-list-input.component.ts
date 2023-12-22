/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import {
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
import { dropboxReverseFadeAndMove } from '~/shared-mod/animations/dropbox.animation';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { SpinnerListElementType } from '~/shared-mod/types/spinner-list-element.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-select-list-input',
  templateUrl: './select-list-input.component.html',
  animations: [dropboxReverseFadeAndMove],
})
export class SelectListInputComponent
  extends AbstractReactiveProvider
  implements OnInit, OnChanges, OnDestroy
{
  @Input() i18nPrefix = '';
  @Input() formControlIdentifier = '';
  @Input() elementsList: SpinnerListElementType[] = [];
  @Input() initElementId?: string;

  @Output() persistElement = new EventEmitter<SpinnerListElementType | null>();
  @ViewChild('selectViewHolder') selectViewHolder?: ElementRef;

  itemsListIsOpen = false;
  formGroup?: FormGroup;
  formDisabled = false;
  defaultPrefix = '';
  selectedElement?: SpinnerListElementType;

  constructor(
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    super();
  }

  ngOnInit(): void {
    this.setSelectedElement();
    this.defaultPrefix = `vsph.${this.i18nPrefix}.formFields.${this.formControlIdentifier}`;
    this.wrapAsObservable$(
      combineLatest([
        this._populateFormGroupService.field$,
        this._populateFormGroupService.formDisabled$,
      ])
    ).subscribe(([formGroup, formDisabled]) => {
      this.formGroup = formGroup;
      this.formDisabled = formDisabled;
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['elementsList']) {
      this.elementsList = changes['elementsList'].currentValue;
      this.setSelectedElement();
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOnDocument(event: MouseEvent): void {
    if (!this.selectViewHolder?.nativeElement.contains(event.target)) {
      this.itemsListIsOpen = false;
    }
  }

  handleShowItemsList(): void {
    this.itemsListIsOpen = !this.itemsListIsOpen;
    this.formGroup?.get(this.formControlIdentifier)?.markAsTouched();
  }

  handleSelectItem(event: Event, element: SpinnerListElementType): void {
    event.stopPropagation();
    this.itemsListIsOpen = false;
    this.selectedElement = element;
    this.persistElement.emit(element);
  }

  private setSelectedElement(): void {
    const initElement = this.elementsList.find(
      ({ id }) => id === this.initElementId
    );
    if (initElement) {
      this.selectedElement = initElement;
    } else {
      this.selectedElement = this.elementsList[0];
    }
  }
}
