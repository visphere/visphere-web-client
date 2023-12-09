/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { LanguageSwitcherService } from '~/root-mod/modules/shared/services/language-switcher/language-switcher.service';
import { UserAccountDetailsModel } from '~/settings-mod/model/user-account-details.model';
import { MyAccountSettingsService } from '~/settings-mod/services/my-account-settings/my-account-settings.service';
import { AbstractIconThemeProvider } from '~/shared-mod/components/abstract-icon-theme-provider';
import { PopulateTooltipService } from '~/shared-mod/context/populate-tooltip/populate-tooltip.service';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';

@Component({
  selector: 'vsph-account-panel-settings',
  templateUrl: './account-panel-settings.component.html',
})
export class AccountPanelSettingsComponent
  extends AbstractIconThemeProvider
  implements OnInit, OnDestroy
{
  accountDetails?: UserAccountDetailsModel;
  tooltipProps?: NgxTippyProps;
  selectedLang$ = this._languageSwitcherService.selectedLang$;

  readonly defaultPrefix = this._myAccountSettingsService.defaultPrefix;

  constructor(
    _themeSwitcherService: ThemeSwitcherService,
    private readonly _populateTooltipService: PopulateTooltipService,
    private readonly _myAccountSettingsService: MyAccountSettingsService,
    private readonly _languageSwitcherService: LanguageSwitcherService
  ) {
    super(_themeSwitcherService);
  }

  ngOnInit(): void {
    this.loadBrandThemedIcon();
    this.wrapAsObservable$(this._populateTooltipService.field$).subscribe(
      props => (this.tooltipProps = props)
    );
    this.wrapAsObservable$(
      this._myAccountSettingsService.accountDetails$
    ).subscribe(accountDetails => (this.accountDetails = accountDetails));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleOpenUpdateFullNameModal(): void {
    this._myAccountSettingsService.activateModal('full-name');
  }

  handleOpenUpdateUsernameModal(): void {
    this._myAccountSettingsService.activateModal('username');
  }

  handleOpenUpdateEmailAddressModal(): void {
    if (!this.accountDetails?.isExternalOAuth2Supplier) {
      this._myAccountSettingsService.activateModal('email');
    }
  }

  handleOpenUpdateSecondEmailAddressModal(): void {
    if (!this.accountDetails?.isExternalOAuth2Supplier) {
      this._myAccountSettingsService.activateModal('second-email');
    }
  }

  handleOpenRemoveSecondEmailAddressModal(): void {
    if (!this.accountDetails?.isExternalOAuth2Supplier) {
      this._myAccountSettingsService.activateModal('delete-second-email');
    }
  }

  handleOpenUpdateBirthDateModal(): void {
    this._myAccountSettingsService.activateModal('birth-date');
  }
}
