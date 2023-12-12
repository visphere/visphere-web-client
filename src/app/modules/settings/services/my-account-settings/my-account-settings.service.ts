/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
  UpdateAccountDetailsReqDto,
  UpdateAccountDetailsResDto,
} from '~/settings-mod/model/update-account-details.model';
import { UpdateAccountPasswordReqDto } from '~/settings-mod/model/update-account-password.model';
import { UserAccountDetailsModel } from '~/settings-mod/model/user-account-details.model';
import { UpdatableModalType } from '~/settings-mod/types/updatable-modal.type';
import { BaseMessageModel } from '~/shared-mod/models/base-message.model';
import { StorageKeys } from '~/shared-mod/models/identity.model';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import { TimeUtilsService } from '~/shared-mod/services/time-utils/time-utils.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import * as NgrxSelector_SHA from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractUserSettingsProvider } from '../abstract-user-settings.provider';
import { SettingsHttpClientService } from '../settings-http-client/settings-http-client.service';
import { UpdatableEmailHttpClientService } from '../updatable-email-http-client/updatable-email-http-client.service';

@Injectable()
export class MyAccountSettingsService extends AbstractUserSettingsProvider {
  private _activeModal$ = new BehaviorSubject<UpdatableModalType>('none');
  private _accountDetails$ = new BehaviorSubject<
    UserAccountDetailsModel | undefined
  >(undefined);

  readonly defaultPrefix =
    'vsph.clientCommon.settingsPage.category.userSettings.subpage.myAccount';

  constructor(
    private readonly _store: Store<SharedReducer>,
    private readonly _settingsHttpClientService: SettingsHttpClientService,
    private readonly _updatableEmailHttpClientService: UpdatableEmailHttpClientService,
    private readonly _localStorageService: LocalStorageService,
    private readonly _timeUtilsService: TimeUtilsService
  ) {
    super(_store);
  }

  pushAccountDetails(accountDetails: UserAccountDetailsModel): void {
    this._accountDetails$.next(accountDetails);
  }

  activateModal(type: UpdatableModalType): void {
    this._activeModal$.next(type);
  }

  closeModal(): void {
    this._activeModal$.next('none');
  }

  loadAccountDetails$(): Observable<UserAccountDetailsModel> {
    return this._onChangeObserver$.pipe(
      switchMap(() =>
        combineLatest([
          this._settingsHttpClientService.getAccountDetails$(),
          this._store.select(NgrxSelector_SHA.selectLoggedUser),
        ]).pipe(
          map(([accountDetails, loggedUser]) => {
            this._isFetching$.next(false);
            return {
              ...accountDetails,
              fullName: loggedUser?.fullName || '',
              profileUrl: loggedUser?.profileUrl || '',
              profileColor: loggedUser?.profileColor || '',
              joinDate: loggedUser?.joinDate || '',
            };
          })
        )
      )
    );
  }

  updateAccountDetails$(
    reqDto: UpdateAccountDetailsReqDto
  ): Observable<UpdateAccountDetailsResDto | null> {
    this.setLoading(true);
    return this._settingsHttpClientService.updateAccountDetails$(reqDto).pipe(
      tap(({ message, accessToken, profileImagePath }) => {
        this._localStorageService.update(
          'loggedUser',
          'accessToken',
          accessToken
        );
        this._store.dispatch(
          NgrxAction_SHA.__updateProfileImageUrl({ imageUrl: profileImagePath })
        );
        this.showSuccessSnackbar(message);
        this._activeModal$.next('none');
        this.setLoading(false);
        this._onChangeObserver$.next(null);
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }

  updateMfaStateSettings$(isEnabled: boolean): Observable<BaseMessageModel> {
    this.setLoading(true);
    return this._settingsHttpClientService
      .updateMfaStateSettings$(isEnabled)
      .pipe(
        tap(({ message }) => {
          this.setLoading(false);
          this.showSuccessSnackbar(message);
          this._onChangeObserver$.next(null);
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }

  updateAccountPassword$(
    reqDto: UpdateAccountPasswordReqDto
  ): Observable<BaseMessageModel> {
    this.setLoading(true);
    return this._settingsHttpClientService
      .updateAccountPassword$(reqDto, this.getRefreshToken())
      .pipe(
        tap(({ message }) => {
          this.showSuccessSnackbar(message);
          this._activeModal$.next('none');
          this.setLoading(false);
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }

  deleteSecondEmailAddress$(): Observable<BaseMessageModel> {
    this.setLoading(true);
    return this._updatableEmailHttpClientService
      .deleteSecondEmailAddress$()
      .pipe(
        tap(({ message }) => {
          this.showSuccessSnackbar(message);
          this._activeModal$.next('none');
          this._onChangeObserver$.next(null);
          this.setLoading(false);
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }

  resetMfaSettings$(logoutFromAll: boolean): Observable<BaseMessageModel> {
    this.setLoading(true);
    return this._settingsHttpClientService
      .resetMfaSettings$(this.getRefreshToken(), logoutFromAll)
      .pipe(
        tap(({ message }) => {
          this.showSuccessSnackbar(message);
          this._activeModal$.next('none');
          this.setLoading(false);
        }),
        catchError(err => {
          this.setLoading(false);
          return throwError(() => err);
        })
      );
  }

  generateBaseReqObj(
    details: UserAccountDetailsModel
  ): UpdateAccountDetailsReqDto {
    return {
      firstName: details.firstName,
      lastName: details.lastName,
      username: details.username,
      birthDate: this._timeUtilsService.composeSlashDateStr(details.birthDate),
    };
  }

  private getRefreshToken(): string {
    return (
      this._localStorageService.get<StorageKeys>('loggedUser')?.refreshToken ||
      ''
    );
  }

  get accountDetails$(): Observable<UserAccountDetailsModel | undefined> {
    return this._accountDetails$.asObservable();
  }
  get activeModal$(): Observable<UpdatableModalType> {
    return this._activeModal$.asObservable();
  }
}
