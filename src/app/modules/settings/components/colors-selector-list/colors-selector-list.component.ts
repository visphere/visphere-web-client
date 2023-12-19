/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileImageLoadableElementType } from '~/settings-mod/types/loadable-element.type';

@Component({
  selector: 'vsph-colors-selector-list',
  templateUrl: './colors-selector-list.component.html',
})
export class ColorsSelectorListComponent {
  @Input() availableColors: string[] = [];
  @Input() selectedColor = '';
  @Input() activeLoading: ProfileImageLoadableElementType = 'none';

  @Output() emitOnUpdateColor = new EventEmitter<string>();
}
