/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'vsph-editable-primitive-value',
  templateUrl: './editable-primitive-value.component.html',
})
export class EditablePrimitiveValueComponent {
  @Input() i18nDescription = '';
  @Input() value? = '';
  @Input() isSpaceBetween = false;
  @Input() isDisabled = false;
  @Input() isButtonDisabled = false;

  @Output() emitOnEdit = new EventEmitter<void>();
}
