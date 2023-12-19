/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Observable,
  catchError,
  combineLatest,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
  MessageWithResourcePathResDto,
  ProfileDetails,
} from '~/settings-mod/model/profile-settings.module';
import { ProfileImageLoadableElementType } from '~/settings-mod/types/loadable-element.type';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractProfileImageProvider } from '../abstract-profile-image.provider';
import { ProfileSettingsHttpClientService } from '../profile-settings-http-client/profile-settings-http-client.service';

@Injectable()
export class ProfileSettingsService extends AbstractProfileImageProvider<ProfileImageLoadableElementType> {
  readonly defaultPrefix =
    'vsph.clientCommon.settingsPage.category.userSettings.subpage.profileSettings';

  constructor(
    private readonly _profileSettingsHttpClientService: ProfileSettingsHttpClientService,
    private readonly _store: Store<SharedReducer>
  ) {
    super(_store);
  }

  loadProfileDetails$(): Observable<ProfileDetails> {
    this._isFetching$.next(true);
    return this._onChangeObserver$.pipe(
      switchMap(() =>
        combineLatest([
          this._profileSettingsHttpClientService.getProfileImageDetails$(),
          this._profileSettingsHttpClientService.getProfileDefaultColors$(),
        ])
      ),
      map(([imageType, defaultColors]) => {
        this._isFetching$.next(false);
        return {
          imageType: imageType.imageType,
          availableColors: defaultColors,
        };
      }),
      catchError(err => {
        this._isFetching$.next(false);
        return throwError(() => err);
      })
    );
  }

  updateProfileColor$(
    color: string
  ): Observable<MessageWithResourcePathResDto> {
    return this.actionOnUpdate$(
      this._profileSettingsHttpClientService.updateProfileColor$({ color }),
      color,
      'changing-color'
    );
  }

  updateProfileImageToCustom$(
    customImage: File
  ): Observable<MessageWithResourcePathResDto> {
    return this.actionOnUpdate$(
      this._profileSettingsHttpClientService.updateProfileImageToCustom$(
        customImage
      ),
      '',
      'generating-image'
    );
  }

  updateProfileImageToIdenticon$(): Observable<MessageWithResourcePathResDto> {
    return this.actionOnUpdate$(
      this._profileSettingsHttpClientService.updateProfileImageToIdenticon$(),
      '',
      'generating-identicon'
    );
  }

  deleteCustomProfileImage$(): Observable<MessageWithResourcePathResDto> {
    return this.actionOnUpdate$(
      this._profileSettingsHttpClientService.deleteCustomProfileImage$(),
      '',
      'deleting-image'
    );
  }

  private actionOnUpdate$(
    inputObservable$: Observable<MessageWithResourcePathResDto>,
    color: string,
    activeLoading: ProfileImageLoadableElementType
  ): Observable<MessageWithResourcePathResDto> {
    this._activeLoading$.next(activeLoading);
    return inputObservable$.pipe(
      tap(({ message, resourcePath }) => {
        this._activeLoading$.next('none');
        this.showSuccessSnackbar(message);
        if (color) {
          this._store.dispatch(NgrxAction_SHA.__updateProfileColor({ color }));
        }
        this._store.dispatch(
          NgrxAction_SHA.__updateProfileImageUrl({ imageUrl: resourcePath })
        );
        this._onChangeObserver$.next(null);
      }),
      catchError(() => {
        this._activeLoading$.next('none');
        return throwError(() => []);
      })
    );
  }
}
