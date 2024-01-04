/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ActivateAccountService } from '~/auth-mod/services/activate-account/activate-account.service';
import { selectActivateAccountEmail } from '~/auth-mod/store/selectors';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { LazyPageLoaderService } from '~/shared-mod/services/lazy-page-loader/lazy-page-loader.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

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

  userEmail$ = this._store.select(selectActivateAccountEmail);
  isLoading$ = this._activateAccountService.isLoading$;
  isResendLoading$ = this._activateAccountService.resendIsLoading$;
  currentStage$ = this._activateAccountService.currentStage$;

  constructor(
    private readonly _store: Store<AuthReducer>,
    private readonly _activateAccountService: ActivateAccountService,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _lazyPageLoaderService: LazyPageLoaderService
  ) {
    super();
    this.activateAccountForm = new FormGroup({
      token: new FormControl('', [Validators.required]),
    });
    this._activateAccountService.setReactiveForm(this.activateAccountForm);
  }

  ngOnInit(): void {
    const token = this._activatedRoute.snapshot.paramMap.get('token');
    if (token) {
      this._lazyPageLoaderService.setLoading();
      this.wrapAsObservable$(
        this._activateAccountService.validateToken$(token)
      ).subscribe({ next: () => this._lazyPageLoaderService.disableLoading() });
    }
    this._populateFormGroupService.setField(this.activateAccountForm);
    this.wrapAsObservable$(this.isLoading$).subscribe(isLoading =>
      this._populateFormGroupService.setFormDisabled(isLoading)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitactivateAccountForm(): void {
    this.wrapAsObservable$(
      this._activateAccountService.submitForm$()
    ).subscribe();
  }

  handleResendMessage(): void {
    this.wrapAsObservable$(
      this._activateAccountService.resendEmailMessage$()
    ).subscribe();
  }

  handleReturnToLoginAndClearState(): void {
    this._activateAccountService.returnToLoginAndClearState();
  }
}
