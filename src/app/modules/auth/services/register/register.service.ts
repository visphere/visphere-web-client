/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import {
  RegisterFormModel,
  RegisterReqDtoModel,
} from '~/auth-mod/models/register-form.model';
import { AuthHttpClientService } from '~/auth-mod/services/auth-http-client/auth-http-client.service';
import * as NgrxAction_ATH from '~/auth-mod/store/actions';
import { RegisterFormStage } from '~/auth-mod/types/form-stage.type';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { AbstractMultistageFormProvider } from '~/shared-mod/services/abstract-multistage-form-provider';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

@Injectable()
export class RegisterService extends AbstractMultistageFormProvider<
  RegisterFormStage,
  BaseMessageModel
> {
  private _captchaModalState$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly _authHttpClientService: AuthHttpClientService,
    private readonly _router: Router,
    private readonly _store: Store<AuthReducer | SharedReducer>
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

  override abstractSubmitForm(): Observable<BaseMessageModel> {
    const data = this.parseFormValues<RegisterFormModel>();
    return this._authHttpClientService
      .registerViaAppAccount(this.mapToRegiterReqDto(data))
      .pipe(
        tap(({ message }) => {
          this._store.dispatch(
            NgrxAction_SHA.__addSnackbar({
              content: {
                placeholder: message,
                omitTransformation: true,
              },
              severity: 'success',
            })
          );
          this._store.dispatch(
            NgrxAction_ATH.__setActivateAccountEmail({
              email: data.firstStage.emailAddress,
            })
          );
          this.setLoading(false);
          this.moveToActivateAccount();
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }

  private mapToRegiterReqDto({
    firstStage,
    secondStage,
  }: RegisterFormModel): RegisterReqDtoModel {
    const { day, month, year } = firstStage.birthDate;
    const birthDateObj = new Date(day, month, year);
    return {
      username: firstStage.username,
      emailAddress: firstStage.emailAddress,
      password: firstStage.password,
      confirmedPassword: firstStage.confirmedPassword,
      birthDate: moment(birthDateObj).format('DD/MM/YYYY'),
      firstName: secondStage.firstName,
      lastName: secondStage.lastName,
      secondEmailAddress: secondStage.secondEmailAddress,
      allowNotifs: secondStage.allowNotifs,
      enabledMfa: secondStage.enabledMfa,
    };
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
