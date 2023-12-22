/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '~/env/environment';
import { windowFadeAndMove } from '~/shared-mod/animations/window.animation';
import { ModalDevastatePrecedence } from '~/shared-mod/types/modal.type';

@Component({
  selector: 'vsph-devastate-action-modal',
  templateUrl: './devastate-action-modal.component.html',
  animations: [windowFadeAndMove],
})
export class DevastateActionModalComponent implements OnInit {
  @Input() i18nPrefix = '';
  @Input() isActive = false;
  @Input() isLoading = false;
  @Input() size: 'sm' | 'xl' = 'xl';
  @Input() precedence: ModalDevastatePrecedence = 'normal';
  @Input() showProceedButton = true;

  @Output() emitOnClose = new EventEmitter<void>();
  @Output() emitDevstateAction = new EventEmitter<void>();

  buttonStyle = '';

  readonly path = environment.contentDistributorBaseUrl;

  ngOnInit(): void {
    let baseStyle = `vsph-modal__button `;
    switch (this.precedence) {
      case 'normal':
        baseStyle += 'vsph-modal__devastate-button--precedence-normal';
        break;
      case 'higher':
        baseStyle += 'vsph-modal__devastate-button--precedence-higher';
        break;
    }
    this.buttonStyle = baseStyle;
  }
}
