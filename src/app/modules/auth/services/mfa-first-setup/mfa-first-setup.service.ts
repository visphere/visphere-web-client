/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  throwError,
} from 'rxjs';
import {
  MfaAuthenticatorDataResDto,
  MfaStateModel,
} from '~/auth-mod/models/mfa-data.model';
import { selectMfaState } from '~/auth-mod/store/selectors';
import { MfaFirstSetupFormStage } from '~/auth-mod/types/form-stage.type';
import { AuthReducer } from '~/auth-mod/types/ngrx-store.type';
import { FetchingState } from '~/shared-mod/types/fetching-state.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';
import { MfaHttpClientService } from '../mfa-http-client/mfa-http-client.service';

@Injectable()
export class MfaFirstSetupService
  extends AbstractReactiveProvider
  implements OnDestroy
{
  private _fetchingState$ = new BehaviorSubject<FetchingState>('pending');
  private _stepperStage$ = new BehaviorSubject<MfaFirstSetupFormStage>(
    'qrcode'
  );

  private _mfaState?: MfaStateModel;

  constructor(
    private readonly _mfaHttpClientService: MfaHttpClientService,
    private readonly _store: Store<AuthReducer>
  ) {
    super();
    this.wrapAsObservable$(this._store.select(selectMfaState)).subscribe(
      state => {
        if (state) {
          this._mfaState = state;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  loadMfaData$(): Observable<MfaAuthenticatorDataResDto | undefined> {
    if (!this._mfaState) {
      return of(undefined);
    }
    const { usernameOrEmailAddress, password } = this._mfaState;
    return this._mfaHttpClientService
      .getAuthenticatorData$({ usernameOrEmailAddress, password })
      .pipe(
        map(data => {
          this._fetchingState$.next('success');
          return data;
        }),
        catchError(err => {
          this._fetchingState$.next('error');
          return throwError(() => err);
        })
      );
  }

  setStepperStage(stage: MfaFirstSetupFormStage): void {
    this._stepperStage$.next(stage);
  }

  get isFetchingState$(): Observable<FetchingState> {
    return this._fetchingState$.asObservable();
  }

  get stepperStage$(): Observable<MfaFirstSetupFormStage> {
    return this._stepperStage$.asObservable();
  }
}
