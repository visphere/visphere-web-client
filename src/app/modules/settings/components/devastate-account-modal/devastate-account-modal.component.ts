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
import { Store } from '@ngrx/store';
import { PasswordConfirmationService } from '~/settings-mod/services/password-confirmation/password-confirmation.service';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import * as NgrxSelector_SHA from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
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
  @Input() isActiveModal = false;
  @Input() i18nParams = {};

  @Output() emitDevastateAction = new EventEmitter<string>();
  @Output() emitCloseModal = new EventEmitter<void>();

  passwordForm: FormGroup;
  commonI18nPrefix = '';
  specifiedI18nPrefix = '';
  isMfaSetup = false;

  isLoading$ = this._passwordConfirmationService.isLoading$;
  currentStage$ = this._passwordConfirmationService.currentStage$;
  isLocalSupplier$ = this._store.select(NgrxSelector_SHA.selectIsLocalSupplier);

  constructor(
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _passwordConfirmationService: PasswordConfirmationService,
    private readonly _store: Store<SharedReducer>
  ) {
    super();
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.passwordForm);
    this.wrapAsObservable$(
      this._store.select(NgrxSelector_SHA.selectIsMfaSetup)
    ).subscribe(isMfaSetup => (this.isMfaSetup = isMfaSetup));
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
    this.commonI18nPrefix = `vsph.clientCommon.settingsPage.modal.devastate`;
    this.specifiedI18nPrefix = `${this.commonI18nPrefix}.${this.i18nPrefix}`;
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleEmitDevastateAction(): void {
    const { password } = this.passwordForm.getRawValue();
    if (this.isMfaSetup) {
      this._passwordConfirmationService.persistPasswordAndUpdateStage(password);
      return;
    }
    this.emitDevastateAction.emit(password);
  }

  handleEmitMfaDevastateAction(mfaToken: string): void {
    this.emitDevastateAction.emit(mfaToken);
  }

  handleCloseModal(): void {
    this._passwordConfirmationService.onCloseModal();
    this.emitCloseModal.emit();
  }
}
