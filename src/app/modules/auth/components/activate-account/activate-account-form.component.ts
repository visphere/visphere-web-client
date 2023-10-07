/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivateAccountService } from '~/auth-mod/services/activate-account/activate-account.service';
import * as NgrxSelector_ATH from '~/auth-mod/store/selectors';
import { ActivateAccountFormStage } from '~/auth-mod/types/form-stage.type';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';
import { exactLengthValidator } from '~/shared-mod/validators/exact-length.validator';
import { regex } from '~/shared-mod/validators/regex.constant';

@Component({
  selector: 'vsph-activate-account-form',
  templateUrl: './activate-account-form.component.html',
  providers: [PopulateFormGroupService, ActivateAccountService],
})
export class ActivateAccountFormComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  activateAccountForm: FormGroup;

  userEmail$: Observable<string> = this._store.select(
    NgrxSelector_ATH.selectActivateAccountEmail
  );
  isLoading$: Observable<boolean> = this._activateAccountService.isLoading$;
  isResendLoading$: Observable<boolean> =
    this._activateAccountService.resendIsLoading$;
  currentStage$: Observable<ActivateAccountFormStage> =
    this._activateAccountService.currentStage$;

  constructor(
    private readonly _store: Store<AuthReducer>,
    private readonly _activateAccountService: ActivateAccountService,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _activatedRoute: ActivatedRoute
  ) {
    super();
    this.activateAccountForm = new FormGroup({
      token: new FormControl('', [
        Validators.required,
        Validators.pattern(regex.OTA_TOKEN),
        exactLengthValidator(10),
      ]),
    });
    this._activateAccountService.setReactiveForm(this.activateAccountForm);
  }

  ngOnInit(): void {
    const token = this._activatedRoute.snapshot.paramMap.get('token');
    if (token) {
      this.wrapAsObservable(
        this._activateAccountService.validateToken(token)
      ).subscribe();
    }
    this._populateFormGroupService.setField(this.activateAccountForm);
    this.wrapAsObservable(this._activateAccountService.isLoading$).subscribe(
      isLoading => this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitactivateAccountForm(): void {
    this.wrapAsObservable(
      this._activateAccountService.submitForm()
    ).subscribe();
  }

  handleResendMessage(): void {
    this.wrapAsObservable(
      this._activateAccountService.resendEmailMessage()
    ).subscribe();
  }

  handleReturnToLoginAndClearState(): void {
    this._activateAccountService.returnToLoginAndClearState();
  }
}
