/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StartResetPasswordViaEmailFormModel } from '~/auth-mod/models/reset-password-form.model';
import { AuthHttpClientService } from '~/auth-mod/services/auth-http-client/auth-http-client.service';
import { ResetPasswordService } from '~/auth-mod/services/reset-password/reset-password.service';
import { AbstractSimpleFormProvider } from '~/shared-mod/services/abstract-simple-form-provider';

@Injectable()
export class StartResetPasswordService extends AbstractSimpleFormProvider<void> {
  constructor(
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _resetPasswordService: ResetPasswordService
  ) {
    super();
  }

  override abstractSubmitForm(): Observable<void> {
    const data = this.parseFormValues<StartResetPasswordViaEmailFormModel>();
    // next
    console.log(data);
    // on success
    this._resetPasswordService.setCurrentStage('token');
    this._resetPasswordService.setUserEmail('development@example.com');

    return of();
  }
}
