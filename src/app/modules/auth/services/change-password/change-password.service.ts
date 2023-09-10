/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChangePasswordFormModel } from '~/auth-mod/models/change-password-form.model';
import { AuthHttpClientService } from '~/auth-mod/services/auth-http-client/auth-http-client.service';
import { ChangePasswordFormStage } from '~/auth-mod/types/form-stage.type';
import { AbstractSimpleFormStateProvider } from '~/shared-mod/services/abstract-simple-form-state-provider';

@Injectable()
export class ChangePasswordService extends AbstractSimpleFormStateProvider<
  ChangePasswordFormStage,
  void
> {
  constructor(private readonly _authHttpClientService: AuthHttpClientService) {
    super('change');
  }

  override abstractSubmitForm(): Observable<void> {
    const data = this.parseFormValues<ChangePasswordFormModel>();
    // next
    console.log(data);
    // success
    this._currentStage$.next('success');

    return of();
  }
}
