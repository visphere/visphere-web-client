/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginFormModel } from '~/auth-mod/models/login-form.model';
import { AuthHttpClientService } from '~/auth-mod/services/auth-http-client/auth-http-client.service';
import { LoginFormStage } from '~/auth-mod/types/form-stage.type';
import { AbstractMultistageFormProvider } from '~/shared-mod/services/abstract-multistage-form-provider';

@Injectable()
export class LoginService
  extends AbstractMultistageFormProvider<LoginFormStage, void>
  implements OnDestroy
{
  private _isNextButtonEnabled$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private readonly _authHttpClientService: AuthHttpClientService) {
    super('login');
  }

  onValueChange(): void {
    this.listenChanges<LoginFormModel>((formValues: LoginFormModel) => {
      this._isNextButtonEnabled$.next(
        formValues.usernameOrEmailAddress.length !== 0
      );
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  moveForward(): void {
    this._currentStage$.next('password');
  }

  moveBackward(): void {
    this._currentStage$.next('login');
    this._rootForm.get('password')?.reset();
  }

  override abstractSubmitForm(): Observable<void> {
    const data = this.parseFormValues<LoginFormModel>();
    // next
    console.log(data);

    return of();
  }

  get isNextButtonEnabled$(): Observable<boolean> {
    return this._isNextButtonEnabled$.asObservable();
  }
}
