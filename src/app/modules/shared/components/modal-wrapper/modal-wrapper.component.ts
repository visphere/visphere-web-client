/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { authWindowFadeAndMove } from '~/shared-mod/animations/auth-window.animation';
import { ModalSize } from '~/shared-mod/types/modal.type';

@Component({
  selector: 'msph-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  animations: [authWindowFadeAndMove],
})
export class ModalWrapperComponent {
  @Input() isActive = false;
  @Input() modalSize: ModalSize = 'sm';
  @Input() header = '';
  @Input() paragraph?: string;
  @Input() isLoading = false;

  @Output() emitOnClose = new EventEmitter<void>();
  @Output() emitOnAnimationDone = new EventEmitter<void>();
}
