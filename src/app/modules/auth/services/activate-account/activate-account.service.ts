/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ActivateAccountFormModel } from '~/auth-mod/models/activate-account-form.model';
import { AuthHttpClientService } from '~/auth-mod/services/auth-http-client/auth-http-client.service';
import * as NgrxAction_ATH from '~/auth-mod/store/actions';
import * as NgrxSelector_ATH from '~/auth-mod/store/selectors';
import { ActivateAccountFormStage } from '~/auth-mod/types/form-stage.type';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { AbstractSimpleFormStateProvider } from '~/shared-mod/services/abstract-simple-form-state-provider';

@Injectable()
export class ActivateAccountService
  extends AbstractSimpleFormStateProvider<ActivateAccountFormStage, void>
  implements OnDestroy
{
  userEmail = '';

  constructor(
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _router: Router,
    private readonly _store: Store<AuthReducer>
  ) {
    super('activate');
    this.wrapAsObservable(
      this._store.select(NgrxSelector_ATH.selectActivateAccountEmail)
    ).subscribe(userEmail => (this.userEmail = userEmail));
  }

  ngOnDestroy(): void {
    this._store.dispatch(NgrxAction_ATH.__removeActivateAccountEmail());
    this.unmountAllSubscriptions();
  }

  override abstractSubmitForm(): Observable<void> {
    const data = this.parseFormValues<ActivateAccountFormModel>();
    // next
    console.log(data, this.userEmail);
    // success
    this._currentStage$.next('success');
    return of();
  }

  async returnToLoginAndClearState(): Promise<void> {
    this._store.dispatch(NgrxAction_ATH.__removeActivateAccountEmail());
    await this._router.navigate(['/auth/login']);
  }

  resendEmailMessage(): void {
    console.log('resend email message');
  }
}
