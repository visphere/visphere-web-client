/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginResDtoModel } from '~/auth-mod/models/login-form.model';
import { MfaCodeForm } from '~/auth-mod/models/mfa-data.model';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractMfaFormProvider } from '../abstract-mfa-form-provider';
import { MfaHttpClientService } from '../mfa-http-client/mfa-http-client.service';

@Injectable()
export class MfaCodeService
  extends AbstractMfaFormProvider
  implements OnDestroy
{
  private _firstSetup = false;

  constructor(
    private readonly _mfaHttpClientService: MfaHttpClientService,
    store: Store<AuthReducer | SharedReducer>,
    router: Router,
    localStorageService: LocalStorageService
  ) {
    super(store, localStorageService, router);
  }

  override abstractSubmitForm(): Observable<LoginResDtoModel> {
    const { code } = this.parseFormValues<MfaCodeForm>();
    const { usernameOrEmailAddress, password } = this._mfaState;
    return this.verifyCodeAndPerformLogin(
      this._mfaHttpClientService.verifyCode(code, this._firstSetup, {
        usernameOrEmailAddress,
        password,
      })
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  setFirstSetup(fistSetup: boolean): void {
    this._firstSetup = fistSetup;
  }
}
