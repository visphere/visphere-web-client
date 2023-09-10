/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FinishResetPasswordViaEmailFormModel } from '~/auth-mod/models/reset-password-form.model';
import { AuthHttpClientService } from '~/auth-mod/services/auth-http-client/auth-http-client.service';
import { ResetPasswordService } from '~/auth-mod/services/reset-password/reset-password.service';
import { AbstractSimpleFormProvider } from '~/shared-mod/services/abstract-simple-form-provider';

@Injectable()
export class FinishResetPasswordService
  extends AbstractSimpleFormProvider<void>
  implements OnDestroy
{
  userEmail = '';

  constructor(
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _resetPasswordService: ResetPasswordService,
    private readonly _router: Router
  ) {
    super();
    this.wrapAsObservable(this._resetPasswordService.userEmail$).subscribe(
      userEmail => (this.userEmail = userEmail)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  override abstractSubmitForm(): Observable<void> {
    const data = this.parseFormValues<FinishResetPasswordViaEmailFormModel>();
    // next
    console.log(data, this.userEmail);
    // on success
    this.moveToInsertNewPasswordPage('1233211233');

    return of();
  }

  resendEmailMessage(): void {
    console.log('resend email message');
  }

  private async moveToInsertNewPasswordPage(token: string): Promise<void> {
    await this._router.navigate([`/auth/change-password/${token}`]);
  }
}
