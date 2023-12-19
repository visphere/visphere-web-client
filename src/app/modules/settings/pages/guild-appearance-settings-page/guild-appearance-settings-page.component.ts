/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuildProfileImageDetailsResDto } from '~/settings-mod/model/guild-profile.model';
import { GuildProfileService } from '~/settings-mod/services/guild-profile/guild-profile.service';
import { ProfileImageUpdatableModalType } from '~/settings-mod/types/updatable-modal.type';
import { AbstractIconThemeProvider } from '~/shared-mod/components/abstract-icon-theme-provider';
import { PopulateTooltipService } from '~/shared-mod/context/populate-tooltip/populate-tooltip.service';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';

@Component({
  selector: 'vsph-guild-appearance-settings-page',
  templateUrl: './guild-appearance-settings-page.component.html',
  providers: [GuildProfileService, PopulateTooltipService],
})
export class GuildAppearanceSettingsPageComponent
  extends AbstractIconThemeProvider
  implements OnInit, OnDestroy
{
  profileImageDetails?: GuildProfileImageDetailsResDto;
  availableColors: string[] = [];

  isFetching$ = this._guildProfileService.isFetching$;
  activeLoading$ = this._guildProfileService.activeLoading$;
  activeModal$ = this._guildProfileService.activeModal$;

  readonly defaultPrefix =
    'vsph.clientCommon.settingsPage.category.guildSettings.subpage.appearance';

  constructor(
    private readonly _guildProfileService: GuildProfileService,
    private readonly _router: Router,
    private readonly _populateTooltipService: PopulateTooltipService,
    _themeSwitcherService: ThemeSwitcherService
  ) {
    super(_themeSwitcherService);
  }

  ngOnInit(): void {
    this.loadBrandThemedIcon();
    this._populateTooltipService.setField({
      placement: 'bottom',
      theme: 'vsph-auth',
      animation: 'scale-subtle',
    });
    this.wrapAsObservable$(
      this._guildProfileService.loadGuildImageData$()
    ).subscribe({
      next: ({ profileImageDetails, availableColors }) => {
        this.profileImageDetails = profileImageDetails;
        this.availableColors = availableColors;
      },
      error: async () => await this._router.navigateByUrl('/'),
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleOpenSelectedModal(
    type: Exclude<ProfileImageUpdatableModalType, 'generating-identicon'>
  ): void {
    this._guildProfileService.openModal(type);
  }

  handleCloseModal(): void {
    this._guildProfileService.closeModal();
  }

  handleUpdateGuildProfileColor(color: string): void {
    this.wrapAsObservable$(
      this._guildProfileService.updateGuildProfileColor$(color)
    ).subscribe();
  }

  handleUpdateGuildProfileImageToCustom(uploadedImage: File): void {
    this.wrapAsObservable$(
      this._guildProfileService.updateGuildProfileImageToCustom$(uploadedImage)
    ).subscribe({ next: () => this._guildProfileService.closeModal() });
  }

  handleDeleteCustomGuildProfileImage(): void {
    this.wrapAsObservable$(
      this._guildProfileService.deleteCustomGuildProfileImage$()
    ).subscribe({ next: () => this._guildProfileService.closeModal() });
  }
}
