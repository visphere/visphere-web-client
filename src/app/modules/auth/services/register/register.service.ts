/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RegisterFormModel } from '~/auth-mod/models/register-form.model';
import { AuthHttpClientService } from '~/auth-mod/services/auth-http-client/auth-http-client.service';
import * as NgrxAction_ATH from '~/auth-mod/store/actions';
import { RegisterFormStage } from '~/auth-mod/types/form-stage.type';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { AbstractMultistageFormProvider } from '~/shared-mod/services/abstract-multistage-form-provider';

@Injectable()
export class RegisterService extends AbstractMultistageFormProvider<
  RegisterFormStage,
  void
> {
  private _captchaModalState$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _router: Router,
    private readonly _store: Store<AuthReducer>
  ) {
    super('first');
  }

  activeCaptchaModal(): void {
    this._captchaModalState$.next(true);
  }

  checkIfFormIsInvalid(): boolean {
    const agreeTermsControl =
      this.getFormGroupStage('second').get('agreeTerms');
    if (!agreeTermsControl) {
      return true;
    }
    return (
      this.getFormGroupStage('first').invalid ||
      this.getFormGroupStage('second').invalid ||
      !agreeTermsControl.value
    );
  }

  override abstractSubmitForm(): Observable<void> {
    const data = this.parseFormValues<RegisterFormModel>();
    // next
    console.log(data);
    // success
    this._store.dispatch(
      NgrxAction_ATH.__setActivateAccountEmail({
        email: data.firstStage.emailAddress,
      })
    );
    this.moveToActivateAccount();

    return of();
  }

  private async moveToActivateAccount(): Promise<void> {
    await this._router.navigate([`/auth/activate-account`]);
  }

  getFormGroupStage(stage: RegisterFormStage): FormGroup {
    return this._rootForm.get(`${stage}Stage`) as FormGroup;
  }

  get captchaModalState$(): BehaviorSubject<boolean> {
    return this._captchaModalState$;
  }
}
