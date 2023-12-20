/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'vsph-toggle-button',
  templateUrl: './toggle-button.component.html',
})
export class ToggleButtonComponent {
  @Input() i18nPrefix = '';
  @Input() i18nToggler = '';
  @Input() hasDescription = false;
  @Input() isSelected = false;
  @Input() isDisabled = false;
  @Input() isFadded = false;
  @Input() immediatelyChange = true;

  @Output() emitValueChanged = new EventEmitter<boolean>();
  @Output() emitBeforeChanged = new EventEmitter<void>();

  readonly prefix = 'vsph.clientCommon.settingsPage.category.';

  handleToggleValue(): void {
    this.emitBeforeChanged.emit();
    if (this.immediatelyChange) {
      this.isSelected = !this.isSelected;
      this.emitValueChanged.emit(this.isSelected);
    }
  }
}
