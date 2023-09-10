/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { authWindowFadeAndMove } from '../../animations/auth-window.animation';
import { ModalService } from '../../services/modal/modal.service';
import { ModalSize } from '../../types/modal.type';

@Component({
  selector: 'msph-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  animations: [authWindowFadeAndMove],
})
export class ModalWrapperComponent {
  isActive$: Observable<boolean> = this._modalService.isOpen$;

  @Input() modalSize: ModalSize = 'sm';
  @Input() header = '';
  @Input() paragraph?: string;
  @Input() isLoading = false;

  @Output() emitOnClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() emitOnAnimationDone: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly _modalService: ModalService) {}

  handleCloseModal(): void {
    this._modalService.setIsOpen(false);
    this.emitOnClose.emit();
  }

  animationDone(): void {
    this.emitOnAnimationDone.emit();
  }
}
