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
  first,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { GuildProfileData } from '~/settings-mod/model/guild-profile.model';
import { MessageWithResourcePathResDto } from '~/settings-mod/model/profile-settings.module';
import { ProfileImageLoadableElementType } from '~/settings-mod/types/loadable-element.type';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractProfileImageProvider } from '../abstract-profile-image.provider';
import { GuildProfileHttpClientService } from '../guild-profile-http-client/guild-profile-http-client.service';
import { ProfileSettingsHttpClientService } from '../profile-settings-http-client/profile-settings-http-client.service';
import { SphereGuildService } from '../sphere-guild/sphere-guild.service';

@Injectable()
export class GuildProfileService extends AbstractProfileImageProvider<
  Exclude<ProfileImageLoadableElementType, 'generating-identicon'>
> {
  constructor(
    private readonly _guildProfileHttpClientService: GuildProfileHttpClientService,
    private readonly _profileSettingsHttpClientService: ProfileSettingsHttpClientService,
    private readonly _sphereGuildService: SphereGuildService,
    _store: Store<SharedReducer>
  ) {
    super(_store);
  }

  loadGuildImageData$(): Observable<GuildProfileData> {
    return combineLatest([
      this._sphereGuildService.guildId$,
      this._onChangeObserver$,
    ]).pipe(
      switchMap(([guildId]) =>
        combineLatest([
          this._guildProfileHttpClientService.getGuildProfileImageDetails$(
            guildId
          ),
          this._profileSettingsHttpClientService.getProfileDefaultColors$(),
        ])
      ),
      map(([profileImageDetails, availableColors]) => {
        this.setFetching(false);
        return {
          profileImageDetails,
          availableColors,
        };
      }),
      catchError(err => {
        this.setFetching(false);
        return throwError(() => err);
      })
    );
  }

  updateGuildProfileColor$(
    color: string
  ): Observable<MessageWithResourcePathResDto> {
    return this.actionOnUpdate$(
      guildId =>
        this._guildProfileHttpClientService.updateGuildProfileColor$(guildId, {
          color,
        }),
      'changing-color'
    );
  }

  updateGuildProfileImageToCustom$(
    customImage: File
  ): Observable<MessageWithResourcePathResDto> {
    return this.actionOnUpdate$(
      guildId =>
        this._guildProfileHttpClientService.updateGuildProfileImageToCustom$(
          guildId,
          customImage
        ),
      'generating-image'
    );
  }

  deleteCustomGuildProfileImage$(): Observable<MessageWithResourcePathResDto> {
    return this.actionOnUpdate$(
      guildId =>
        this._guildProfileHttpClientService.deleteCustomGuildProfileImage$(
          guildId
        ),
      'deleting-image'
    );
  }

  private actionOnUpdate$(
    inputObservable$: (
      guildId: number
    ) => Observable<MessageWithResourcePathResDto>,
    activeLoading: Exclude<
      ProfileImageLoadableElementType,
      'generating-identicon'
    >
  ): Observable<MessageWithResourcePathResDto> {
    return of(null).pipe(
      tap(() => this._activeLoading$.next(activeLoading)),
      switchMap(() => this._sphereGuildService.guildId$),
      first(),
      switchMap(guildId => inputObservable$(guildId)),
      tap(({ message }) => {
        this._activeLoading$.next('none');
        this.showSuccessSnackbar(message);
        this.updateWsSignalValue();
      }),
      catchError(err => {
        this._activeLoading$.next('none');
        return throwError(() => err);
      })
    );
  }
}
