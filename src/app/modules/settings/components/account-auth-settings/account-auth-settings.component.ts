/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountDetailsModel } from '~/settings-mod/model/user-account-details.model';
import { DevastateAccountService } from '~/settings-mod/services/devastate-account/devastate-account.service';
import { MyAccountSettingsService } from '~/settings-mod/services/my-account-settings/my-account-settings.service';
import { PasswordConfirmationService } from '~/settings-mod/services/password-confirmation/password-confirmation.service';
import { UpdatableModalType } from '~/settings-mod/types/updatable-modal.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-account-auth-settings',
  templateUrl: './account-auth-settings.component.html',
  providers: [DevastateAccountService, PasswordConfirmationService],
})
export class AccountAuthSettingsComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  accountDetails?: UserAccountDetailsModel;
  logoutFromAll = false;

  activeModal$ = this._myAccountSettingsService.activeModal$;

  readonly defaultPrefix = this._myAccountSettingsService.defaultPrefix;

  constructor(
    private readonly _myAccountSettingsService: MyAccountSettingsService,
    private readonly _devastateAccountService: DevastateAccountService,
    private readonly _rotuer: Router
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
    if (!this.accountDetails?.externalOAuth2Supplier) {
      this._myAccountSettingsService.activateModal('password');
    }
  }

  handleToggleMfaEnabled(isEnabled: boolean): void {
    if (!this.accountDetails?.externalOAuth2Supplier) {
      this.wrapAsObservable$(
        this._myAccountSettingsService.updateMfaStateSettings$(isEnabled)
      ).subscribe();
    }
  }

  handleOpenModal(modalType: UpdatableModalType): void {
    this._myAccountSettingsService.activateModal(modalType);
  }

  handleCloseActiveModal(): void {
    this._myAccountSettingsService.closeModal();
  }

  handleResetMfaSettings(): void {
    if (!this.accountDetails?.externalOAuth2Supplier) {
      this.wrapAsObservable$(
        this._myAccountSettingsService.resetMfaSettings$(this.logoutFromAll)
      ).subscribe();
    }
  }

  handleDisableAccount(passwordOrMfaCode: string): void {
    this.wrapAsObservable$(
      this._devastateAccountService.disableAcount$(passwordOrMfaCode)
    ).subscribe({ next: async () => this.logout() });
  }

  handleDeleteAccount(passwordOrMfaCode: string): void {
    this.wrapAsObservable$(
      this._devastateAccountService.deleteAccount$(passwordOrMfaCode)
    ).subscribe({ next: async () => this.logout() });
  }

  private async logout(): Promise<void> {
    this._myAccountSettingsService.closeModal();
    await this._rotuer.navigateByUrl('/auth/login');
  }
}
