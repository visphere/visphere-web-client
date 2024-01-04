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
import {
  actionUpdateProfileColor,
  actionUpdateProfileImageUrl,
} from '~/shared-mod/store/actions';
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
    return this._onChangeObserver$.pipe(
      tap(() => this._isFetching$.next(true)),
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
      'changing-color',
      true
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
      'generating-image',
      true
    );
  }

  updateProfileImageToIdenticon$(): Observable<MessageWithResourcePathResDto> {
    return this.actionOnUpdate$(
      this._profileSettingsHttpClientService.updateProfileImageToIdenticon$(),
      '',
      'generating-identicon',
      true
    );
  }

  deleteCustomProfileImage$(): Observable<MessageWithResourcePathResDto> {
    return this.actionOnUpdate$(
      this._profileSettingsHttpClientService.deleteCustomProfileImage$(),
      '',
      'deleting-image',
      true
    );
  }

  toggleOAuth2ProfileImageProvider$(
    fromProvider: boolean
  ): Observable<MessageWithResourcePathResDto> {
    return this.actionOnUpdate$(
      this._profileSettingsHttpClientService.toggleOAuth2ProfileImageProvider$(
        fromProvider
      ),
      '',
      'changing-image-provider',
      false
    );
  }

  private actionOnUpdate$(
    inputObservable$: Observable<MessageWithResourcePathResDto>,
    color: string,
    activeLoading: ProfileImageLoadableElementType,
    refetch: boolean
  ): Observable<MessageWithResourcePathResDto> {
    this._activeLoading$.next(activeLoading);
    return inputObservable$.pipe(
      tap(({ message, resourcePath }) => {
        this._activeLoading$.next('none');
        this.showSuccessSnackbar(message);
        if (color) {
          this._store.dispatch(actionUpdateProfileColor({ color }));
        }
        this._store.dispatch(
          actionUpdateProfileImageUrl({ imageUrl: resourcePath })
        );
        if (refetch) {
          this._onChangeObserver$.next(null);
        }
      }),
      catchError(err => {
        this._activeLoading$.next('none');
        return throwError(() => err);
      })
    );
  }
}
