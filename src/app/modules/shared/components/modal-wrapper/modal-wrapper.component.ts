/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: modal-wrapper.component.ts
 *   Created at: 2023-08-23, 00:24:31
 *   Last updated at: 2023-08-23, 00:24:31
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
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
