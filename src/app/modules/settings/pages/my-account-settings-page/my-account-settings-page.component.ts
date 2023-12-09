/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { MyAccountSettingsService } from '~/settings-mod/services/my-account-settings/my-account-settings.service';
import { UpdatableModalType } from '~/settings-mod/types/updatable-modal.type';
import { PopulateTooltipService } from '~/shared-mod/context/populate-tooltip/populate-tooltip.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-my-account-settings-page',
  templateUrl: './my-account-settings-page.component.html',
  providers: [PopulateTooltipService, MyAccountSettingsService],
})
export class MyAccountSettingsPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  isFetching$ = this._myAccountSettingsService.isFetching$;
  activeModal = 'none';

  constructor(
    private readonly _populateTooltipService: PopulateTooltipService,
    private readonly _myAccountSettingsService: MyAccountSettingsService
  ) {
    super();
  }

  ngOnInit(): void {
    this._populateTooltipService.setField({
      placement: 'bottom',
      theme: 'vsph-auth',
      animation: 'scale-subtle',
    });
    this.wrapAsObservable$(
      combineLatest([
        this._myAccountSettingsService.loadAccountDetails$(),
        this._myAccountSettingsService.activeModal$,
      ])
    ).subscribe(([accountDetails, activeModal]) => {
      this._myAccountSettingsService.pushAccountDetails(accountDetails);
      this.activeModal = activeModal;
    });
  }

  enabledModal(type: UpdatableModalType): boolean {
    return this.activeModal === type;
  }

  handleCloseRemoveSecondEmailAddressModal(): void {
    this._myAccountSettingsService.closeModal();
  }

  handleRemoveSecondEmailAddressModal(): void {
    this.wrapAsObservable$(
      this._myAccountSettingsService.deleteSecondEmailAddress$()
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
