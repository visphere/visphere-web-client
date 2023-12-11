/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAccountDetailsModel } from '~/settings-mod/model/user-account-details.model';
import { DevastateAccountService } from '~/settings-mod/services/devastate-account/devastate-account.service';
import { MyAccountSettingsService } from '~/settings-mod/services/my-account-settings/my-account-settings.service';
import { UpdatableModalType } from '~/settings-mod/types/updatable-modal.type';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-devastate-account-modal',
  templateUrl: './devastate-account-modal.component.html',
  providers: [PopulateFormGroupService],
})
export class DevastateAccountModalComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() i18nPrefix = '';
  @Input() modalType: UpdatableModalType = 'disable-account';

  @Output() emitDevastateAction = new EventEmitter<string>();

  passwordForm: FormGroup;
  accountDetails?: UserAccountDetailsModel;
  commonI18nPrefix = '';
  specifiedI18nPrefix = '';

  isLoading$ = this._devastateAccountService.isLoading$;
  activeModal$ = this._myAccountSettingsService.activeModal$;
  currentStage$ = this._devastateAccountService.currentStage$;

  constructor(
    private readonly _myAccountSettingsService: MyAccountSettingsService,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _devastateAccountService: DevastateAccountService
  ) {
    super();
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.passwordForm);
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
    this.wrapAsObservable$(
      this._myAccountSettingsService.accountDetails$
    ).subscribe(accountDetails => (this.accountDetails = accountDetails));
    this.commonI18nPrefix = `vsph.clientCommon.settingsPage.modal.devastate`;
    this.specifiedI18nPrefix = `${this.commonI18nPrefix}.${this.i18nPrefix}`;
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleEmitDevastateAction(): void {
    const { password } = this.passwordForm.getRawValue();
    if (this.accountDetails?.mfaSetup) {
      this._devastateAccountService.persistPasswordAndUpdateStage(password);
      return;
    }
    this.emitDevastateAction.emit(password);
  }

  handleEmitMfaDevastateAction(mfaToken: string): void {
    this.emitDevastateAction.emit(mfaToken);
  }

  handleCloseModal(): void {
    this._devastateAccountService.onCloseModal();
    this._myAccountSettingsService.closeModal();
  }
}
