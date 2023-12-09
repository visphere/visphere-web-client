/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserAccountDetailsModel } from '~/settings-mod/model/user-account-details.model';
import { MyAccountSettingsService } from '~/settings-mod/services/my-account-settings/my-account-settings.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-account-auth-settings',
  templateUrl: './account-auth-settings.component.html',
})
export class AccountAuthSettingsComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  accountDetails?: UserAccountDetailsModel;

  readonly defaultPrefix = this._myAccountSettingsService.defaultPrefix;

  constructor(
    private readonly _myAccountSettingsService: MyAccountSettingsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._myAccountSettingsService.accountDetails$
    ).subscribe(accountDetails => (this.accountDetails = accountDetails));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleOpenChangePasswordModal(): void {
    if (!this.accountDetails?.isExternalOAuth2Supplier) {
      this._myAccountSettingsService.activateModal('password');
    }
  }

  handleToggleMfaEnabled(isEnabled: boolean): void {
    if (!this.accountDetails?.isExternalOAuth2Supplier) {
      this.wrapAsObservable$(
        this._myAccountSettingsService.updateMfaStateSettings$(isEnabled)
      ).subscribe();
    }
  }

  handleOpenDisableAccountModal(): void {
    this._myAccountSettingsService.activateModal('disable-account');
  }

  handleOpenDeleteAccountModal(): void {
    this._myAccountSettingsService.activateModal('delete-account');
  }
}
