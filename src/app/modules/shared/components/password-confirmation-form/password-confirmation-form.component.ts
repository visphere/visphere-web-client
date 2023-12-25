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
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { PasswordConfirmationService } from '~/shared-mod/services/password-confirmation/password-confirmation.service';
import * as NgrxSelector_SHA from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-password-confirmation-form',
  templateUrl: './password-confirmation-form.component.html',
  providers: [PopulateFormGroupService],
})
export class PasswordConfirmationFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() i18nSuffixSubmitButton = '';
  @Input() i18nDescription = '';
  @Input() i18nParams = {};

  @Output() emitSubmitConfirmation = new EventEmitter<string>();

  passwordForm: FormGroup;
  isMfaSetup = false;

  readonly defaultPrefix = 'vsph.clientCommon.forAll.passwordConfirmation';

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
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitPasswordConfirmation(): void {
    const { password } = this.passwordForm.getRawValue();
    console.log(this.isMfaSetup);
    if (this.isMfaSetup) {
      this._passwordConfirmationService.persistPasswordAndUpdateStage(password);
      return;
    }
    this.emitSubmitConfirmation.emit(password);
  }

  handleSubmitMfaConfirmation(mfaToken: string): void {
    this.emitSubmitConfirmation.emit(mfaToken);
  }
}
