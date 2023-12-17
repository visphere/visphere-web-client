/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractLoadableProvider } from '~/root-mod/modules/shared/services/abstract-loadable-provider';
import { PasswordConfirmationReqDto } from '~/settings-mod/model/password-confirmation.model';
import { DevastateModalFormStage } from '~/settings-mod/types/form-stages.type';

@Injectable()
export class PasswordConfirmationService extends AbstractLoadableProvider {
  private _savedPassword = '';
  private _currentStage$ = new BehaviorSubject<DevastateModalFormStage>(
    'password'
  );

  persistPasswordAndUpdateStage(password: string): void {
    this._savedPassword = password;
    this._currentStage$.next('mfa');
  }

  returnToPassword(): void {
    this._currentStage$.next('password');
  }

  onCloseModal(): void {
    this.returnToPassword();
    this._savedPassword = '';
  }

  formatToConfirmationDto(
    passwordOrMfaCode: string
  ): PasswordConfirmationReqDto {
    let password = passwordOrMfaCode;
    let mfaCode = '';
    if (this._savedPassword) {
      password = this._savedPassword;
      mfaCode = passwordOrMfaCode;
    }
    return {
      password,
      mfaCode,
    };
  }

  setStage(stage: DevastateModalFormStage): void {
    this._currentStage$.next(stage);
  }

  get currentStage$(): Observable<DevastateModalFormStage> {
    return this._currentStage$.asObservable();
  }
}
