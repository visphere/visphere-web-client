/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MySavedAccountModel } from '~/auth-mod/models/my-saved-account.model';
import { MyAccountsCredentialsService } from '~/auth-mod/services/my-accounts-credentials/my-accounts-credentials.service';
import { MyAccountsService } from '~/auth-mod/services/my-accounts/my-accounts.service';
import { environment } from '~/env/environment';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-login-my-account-modal',
  templateUrl: './login-my-account-modal.component.html',
  providers: [MyAccountsCredentialsService, PopulateFormGroupService],
})
export class LoginMyAccountModalComponent
  extends AbstractReactiveProvider
  implements OnInit, OnChanges, OnDestroy
{
  @Input() loggedUser?: MySavedAccountModel;

  loginForm: FormGroup;

  isLoading$ = this._myAccountsCredentialsService.isLoading$;
  isOpen$ = this._myAccountsService.loginOnAccountModalIsOpen$;

  readonly path = environment.contentDistributorBaseUrl;

  constructor(
    private readonly _myAccountsService: MyAccountsService,
    private readonly _myAccountsCredentialsService: MyAccountsCredentialsService,
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    super();
    this.loginForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
    });
    this._myAccountsCredentialsService.setReactiveForm(this.loginForm);
  }

  ngOnInit(): void {
    this._populateFormGroupService.setField(this.loginForm);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._myAccountsCredentialsService.setLoggedUser(
      changes['loggedUser'].currentValue
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleEmitOnClose(): void {
    this._myAccountsService.changeLoginOnAccountModalVisibility(false);
    this.loginForm.reset();
  }

  handleLoginViaSavedAccount(): void {
    this.wrapAsObservable$(
      this._myAccountsCredentialsService.submitForm$()
    ).subscribe({ next: () => this.handleEmitOnClose() });
  }
}
