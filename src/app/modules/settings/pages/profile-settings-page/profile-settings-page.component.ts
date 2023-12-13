/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { ProfileSettingsService } from '~/settings-mod/services/profile-settings/profile-settings.service';
import { ImageType } from '~/settings-mod/types/image-type';
import { ProfileImageUpdatableModalType } from '~/settings-mod/types/updatable-modal.type';
import { PopulateTooltipService } from '~/shared-mod/context/populate-tooltip/populate-tooltip.service';
import * as NgrxSelector_SHA from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-profile-settings-page',
  templateUrl: './profile-settings-page.component.html',
  providers: [PopulateTooltipService, ProfileSettingsService],
})
export class ProfileSettingsPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  selectedColor = '';
  availableColors: string[] = [];
  loadedImageType: ImageType = 'default';

  activeLoading$ = this._profileSettingsService.activeLoading$;
  activeModal$ = this._profileSettingsService.activeModal$;
  isFetching$ = this._profileSettingsService.isFetching$;

  readonly defaultPrefix = this._profileSettingsService.defaultPrefix;

  constructor(
    private readonly _populateTooltipService: PopulateTooltipService,
    private readonly _profileSettingsService: ProfileSettingsService,
    private readonly _store: Store<SharedReducer>
  ) {
    super();
  }

  ngOnInit(): void {
    this._populateTooltipService.setField({
      placement: 'bottom',
      theme: 'vsph-auth',
      animation: 'scale-subtle',
    });
    this.wrapAsObservable$(
      combineLatest([
        this._store.select(NgrxSelector_SHA.selectLoggedUser),
        this._profileSettingsService.loadProfileDetails$(),
      ])
    ).subscribe(([loggedUser, profileDetails]) => {
      this.selectedColor = loggedUser?.profileColor || '';
      this.availableColors = profileDetails.availableColors;
      this.loadedImageType = profileDetails.imageType;
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleOpenSelectedModal(type: ProfileImageUpdatableModalType): void {
    this._profileSettingsService.openModal(type);
  }

  handleCloseModal(): void {
    this._profileSettingsService.closeModal();
  }

  handleUpdateProfileColor(color: string): void {
    this.selectedColor = color;
    this.wrapAsObservable$(
      this._profileSettingsService.updateProfileColor$(color)
    ).subscribe();
  }

  handleUpdateProfileImageToCustom(uploadedImage: File): void {
    this.wrapAsObservable$(
      this._profileSettingsService.updateProfileImageToCustom$(uploadedImage)
    ).subscribe({ next: () => this._profileSettingsService.closeModal() });
  }

  handleUpdateProfileImageToIdenticon(): void {
    this.wrapAsObservable$(
      this._profileSettingsService.updateProfileImageToIdenticon$()
    ).subscribe();
  }

  handleDeleteCustomProfileImage(): void {
    this.wrapAsObservable$(
      this._profileSettingsService.deleteCustomProfileImage$()
    ).subscribe({ next: () => this._profileSettingsService.closeModal() });
  }
}
