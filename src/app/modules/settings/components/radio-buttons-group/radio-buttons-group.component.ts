/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '~/env/environment';
import { RadioElement } from '~/settings-mod/types/radio-element.type';

@Component({
  selector: 'vsph-radio-buttons-group',
  templateUrl: './radio-buttons-group.component.html',
})
export class RadioButtonsGroupComponent {
  @Input() i18nLabel = '';
  @Input() elements: RadioElement[] = [];
  @Input() isDisabled = false;

  @Output() emitRadioChange = new EventEmitter<RadioElement>();

  path = environment.contentDistributorBaseUrl;

  handleClickElement(index: number): void {
    const elements = [...this.elements];
    this.elements = elements.map((el, idx) => {
      el.isSelected = idx === index;
      return el;
    });
    const element = elements.find((_, idx) => idx === index);
    if (element) {
      this.emitRadioChange.emit(element);
    }
  }
}
