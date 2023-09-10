/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'msph-lazy-button-spinner',
  templateUrl: './lazy-button-spinner.component.html',
})
export class LazyButtonSpinnerComponent {
  @Input() size: 'sm' | 'lg' = 'lg';
  @Input() color: 'mono' | 'device' = 'mono';
}
