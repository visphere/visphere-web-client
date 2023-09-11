/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { ResetPasswordFormStage } from '~/root-mod/modules/auth/types/form-stage.type';

@Injectable()
export class ResetPasswordService {
  private _currentStage$ = new BehaviorSubject<ResetPasswordFormStage>('login');

  private _userEmail$: ReplaySubject<string> = new ReplaySubject<string>(1);

  setCurrentStage(stage: ResetPasswordFormStage): void {
    this._currentStage$.next(stage);
  }

  setUserEmail(userEmail: string): void {
    this._userEmail$.next(userEmail);
  }

  get currentStage$(): Observable<ResetPasswordFormStage> {
    return this._currentStage$.asObservable();
  }
  get userEmail$(): Observable<string> {
    return this._userEmail$.asObservable();
  }
}
