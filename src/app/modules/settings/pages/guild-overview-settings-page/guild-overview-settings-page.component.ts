/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  EditGuildReqDto,
  GuildOwnerOverviewResDto,
  UpdateGuildVisibilityReqDto,
} from '~/settings-mod/model/guild-management.model';
import { GuildOverviewService } from '~/settings-mod/services/guild-overview/guild-overview.service';
import { UpdateSphereGuildOverviewModalType } from '~/settings-mod/types/updatable-modal.type';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-guild-overview-settings-page',
  templateUrl: './guild-overview-settings-page.component.html',
  providers: [PopulateFormGroupService, GuildOverviewService],
})
export class GuildOverviewSettingsPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  sphereGuildForm?: FormGroup;
  guildOverview?: GuildOwnerOverviewResDto;
  isSetSphereToPublicModalActive = false;
  isPublic = false;
  selectedCategory = '';
  memorizedName = '';
  deleteAllJoinLinks = true;

  isFetching$ = this._guildOverviewService.isFetching$;
  activeLoading$ = this._guildOverviewService.activeLoading$;

  readonly defaultPrefix =
    'clientCommon.settingsPage.category.guildSettings.subpage.overview';

  constructor(
    private readonly _guildOverviewService: GuildOverviewService,
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._guildOverviewService.loadGuildOverview$()
    ).subscribe(guildOverview => {
      this.sphereGuildForm = new FormGroup({
        name: new FormControl(guildOverview.name, [
          Validators.required,
          Validators.minLength(3),
        ]),
      });
      this._populateFormGroupService.setField(this.sphereGuildForm);
      this.guildOverview = guildOverview;
      this.isPublic = !guildOverview.isPrivate;
      this.selectedCategory = guildOverview.category;
      this.memorizedName = guildOverview.name;
      this.wrapAsObservable$(this.activeLoading$).subscribe(isLoading =>
        this._populateFormGroupService.setFormDisabled(isLoading !== 'none')
      );
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleRevertPreviousName(): void {
    this.sphereGuildForm?.get('name')?.patchValue(this.memorizedName);
  }

  handleSubmitUpdateGuild(
    activeLoading: UpdateSphereGuildOverviewModalType
  ): void {
    const reqDto: EditGuildReqDto = {
      name: this.sphereGuildForm?.get('name')?.value,
      category: this.selectedCategory,
    };
    this.wrapAsObservable$(
      this._guildOverviewService.updateGuildDetails$(reqDto, activeLoading)
    ).subscribe();
  }

  handleToggleSphereVisibility(): void {
    if (!this.isPublic) {
      this.isSetSphereToPublicModalActive = true;
    } else {
      this.isPublic = false;
      this.onUpdateVisibility();
    }
  }

  handleSetSphereToPublic(): void {
    this.isPublic = true;
    this.onUpdateVisibility();
    this.isSetSphereToPublicModalActive = false;
  }

  handleToggleCategory(category: string): void {
    this.selectedCategory = category;
    this.handleSubmitUpdateGuild('change-category');
  }

  private onUpdateVisibility(): void {
    const reqDto: UpdateGuildVisibilityReqDto = {
      isPrivate: !this.isPublic,
      unactiveAllPreviousLinks: this.deleteAllJoinLinks,
    };
    this.wrapAsObservable$(
      this._guildOverviewService.updateGuildVisibility$(reqDto)
    ).subscribe();
  }

  get nameFieldIsExact(): boolean {
    return this.sphereGuildForm?.get('name')?.value === this.memorizedName;
  }
}
