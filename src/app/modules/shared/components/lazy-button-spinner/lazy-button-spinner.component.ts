/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'msph-lazy-button-spinner',
  templateUrl: './lazy-button-spinner.component.html',
})
export class LazyButtonSpinnerComponent {
  @Input() size: 'sm' | 'lg' = 'lg';
  @Input() color: 'modal' | '' = '';
  @Input() isLoading = false;
  @Input() i18nText = '';
  @Input() buttonStyle = 'msph-button msph-button--primary';
  @Input() buttonDisabled = false;
  @Input() buttonType: 'button' | 'submit' = 'submit';

  @Output() emitClick = new EventEmitter<void>();
}
