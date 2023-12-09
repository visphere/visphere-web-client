/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyAccountSettingsService } from '~/settings-mod/services/my-account-settings/my-account-settings.service';
import { UpdatableEmailService } from '~/settings-mod/services/updatable-email/updatable-email.service';
import { AbstractUpdatableModalProvider } from '../abstract-updatable-modal-provider';

@Component({
  selector: 'vsph-email-address-updatable-modal',
  templateUrl: './email-address-updatable-modal.component.html',
  providers: [UpdatableEmailService],
})
export class EmailAddressUpdatableModalComponent
  extends AbstractUpdatableModalProvider
  implements OnInit, OnDestroy
{
  currentStage$ = this._updatableEmailService.currentStage$;
  emailAddress = '';

  constructor(
    private readonly _myAccountSettingsService: MyAccountSettingsService,
    private readonly _updatableEmailService: UpdatableEmailService
  ) {
    super(_myAccountSettingsService);
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._myAccountSettingsService.accountDetails$
    ).subscribe(details => {
      this.emailAddress = details?.emailAddress || '';
    });
    this._updatableEmailService.setEmailVariant('first');
    this._updatableEmailService.setI18nPrefix(
      'clientCommon.settingsPage.modal.emailAddress'
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  closeAndEmitChanges(): void {
    this.closeModal();
  }
}
