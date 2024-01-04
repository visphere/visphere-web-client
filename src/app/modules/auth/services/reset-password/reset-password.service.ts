/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { ResetPasswordFormStage } from '~/auth-mod/types/form-stage.type';

@Injectable()
export class ResetPasswordService {
  private _currentStage$ = new BehaviorSubject<ResetPasswordFormStage>('login');
  private _userLoginOrEmail$ = new ReplaySubject<string>(1);

  setCurrentStage(stage: ResetPasswordFormStage): void {
    this._currentStage$.next(stage);
  }

  setUsernameOrEmailAddress(userEmail: string): void {
    this._userLoginOrEmail$.next(userEmail);
  }

  get currentStage$(): Observable<ResetPasswordFormStage> {
    return this._currentStage$.asObservable();
  }
  get userLoginOrEmail$(): Observable<string> {
    return this._userLoginOrEmail$.asObservable();
  }
}
