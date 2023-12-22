/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { windowFadeAndMove } from '~/root-mod/modules/shared/animations/window.animation';
import { ModalSize } from '~/shared-mod/types/modal.type';

@Component({
  selector: 'vsph-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  animations: [windowFadeAndMove],
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
