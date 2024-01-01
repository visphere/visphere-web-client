/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { DevastateModalData } from '~/settings-mod/model/user-account-details.model';
import { PasswordConfirmationService } from '~/shared-mod/services/password-confirmation/password-confirmation.service';

@Component({
  selector: 'vsph-devastate-account-modal',
  templateUrl: './devastate-account-modal.component.html',
})
export class DevastateAccountModalComponent {
  @Input() i18nPrefix = '';
  @Input() isActiveModal = false;
  @Input() i18nParams = {};
  @Input() showDeleteMessagesCheckbox = true;
  @Input() deleteAllMessages = false;

  @Output() emitDevastateAction = new EventEmitter<DevastateModalData>();
  @Output() emitCloseModal = new EventEmitter<void>();

  readonly defaultPrefix = 'vsph.clientCommon.settingsPage.modal.devastate';
  readonly tooltipProps: NgxTippyProps = {
    placement: 'top',
    theme: 'vsph-auth',
    animation: 'scale-subtle',
  };

  constructor(
    private readonly _passwordConfirmationService: PasswordConfirmationService
  ) {}

  handleEmitOnSubmitConfirmation(passwordOrMfaCode: string): void {
    this.emitDevastateAction.emit({
      passwordOrMfaCode,
      deleteAllMessages: this.deleteAllMessages,
    });
  }

  handleCloseModal(): void {
    this._passwordConfirmationService.onCloseModal();
    this.emitCloseModal.emit();
  }
}
