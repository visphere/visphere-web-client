/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
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
  selector: 'vsph-single-select-spinner',
  templateUrl: './single-select-spinner.component.html',
  animations: [dropboxFadeAndMove],
})
export class SingleSelectSpinnerComponent
  extends AbstractReactiveProvider
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() multiSpinnerId!: string;
  @Input() initValueId!: number | null;
  @Input() listElements: SpinnerListElementType[] = [];
  @Input() inputStyle: 'viewport' | 'static' = 'viewport';

  @Output() persistElement = new EventEmitter<SpinnerListElementType | null>();

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
    this.wrapAsObservable$(
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
      this.i18nPlaceholder = `vsph.${i18nPrefix}.formFields.${formControlName}.placeholder`;
      if (this.multiSpinnerId) {
        this.i18nPlaceholder += `s.${this.multiSpinnerId}`;
      }
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['listElements']) {
      return;
    }
    this.filteredList = changes['listElements'].currentValue;
    this.setInitialValue();
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  @HostListener('document:click', ['$event'])
  onClickOnDocument(event: MouseEvent): void {
    if (this.selectViewHolder.nativeElement.contains(event.target)) {
      return;
    }
    this.itemsListIsOpen = false;
    if (
      !this.listElements.find(
        e => e.value === this.inputElement.nativeElement.value
      )
    ) {
      this.inputElement.nativeElement.value = '';
      this.handleFilterElements('');
      if (this.isTouched) {
        this.persistElement.emit(null);
      }
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
    if (!initValue || !this.inputElement) {
      return;
    }
    this.inputElement.nativeElement.value = initValue.value;
  }

  get hasErrors(): boolean {
    return Boolean(this.formGroup.get(this.formControlName)?.errors);
  }
}
