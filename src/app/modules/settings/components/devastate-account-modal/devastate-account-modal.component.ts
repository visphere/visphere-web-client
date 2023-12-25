/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PasswordConfirmationService } from '~/shared-mod/services/password-confirmation/password-confirmation.service';

@Component({
  selector: 'vsph-devastate-account-modal',
  templateUrl: './devastate-account-modal.component.html',
})
export class DevastateAccountModalComponent {
  @Input() i18nPrefix = '';
  @Input() isActiveModal = false;
  @Input() i18nParams = {};

  @Output() emitDevastateAction = new EventEmitter<string>();
  @Output() emitCloseModal = new EventEmitter<void>();

  readonly defaultPrefix = 'vsph.clientCommon.settingsPage.modal.devastate';

  constructor(
    private readonly _passwordConfirmationService: PasswordConfirmationService
  ) {}

  handleEmitOnSubmitConfirmation(passwordOrMfaCode: string): void {
    this.emitDevastateAction.emit(passwordOrMfaCode);
  }

  handleCloseModal(): void {
    this._passwordConfirmationService.onCloseModal();
    this.emitCloseModal.emit();
  }
}
