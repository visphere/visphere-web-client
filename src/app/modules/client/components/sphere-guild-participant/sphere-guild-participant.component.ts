/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxFloatUiContentComponent } from 'ngx-float-ui';
import { GuildDetailsResDto } from '~/client-mod/model/guild.model';
import { GuildParticipantDetailsResDto } from '~/client-mod/model/participant.model';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { ParticipantService } from '~/client-mod/services/participant/participant.service';
import * as NgrxAction_CLN from '~/client-mod/store/actions';
import { DevastateMemberModal } from '~/client-mod/types/modal-mode.type';
import { ClientReducer } from '~/client-mod/types/ngx-store.type';
import { AbstractIconThemeProvider } from '~/shared-mod/components/abstract-icon-theme.provider';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';
import { floatUiConfig } from '~/shared-mod/utils/float-ui.config';

@Component({
  selector: 'vsph-sphere-guild-participant',
  templateUrl: './sphere-guild-participant.component.html',
})
export class SphereGuildParticipantComponent
  extends AbstractIconThemeProvider
  implements OnInit, OnDestroy
{
  @Input() guildId?: number;
  @Input() userId?: number;
  @Input() profileImageUrl = '';
  @Input() userFullName = '';
  @Input() isOwner = false;

  @ViewChild('userDetailsTooltipContent', { static: false })
  userDetailsTooltipContent?: NgxFloatUiContentComponent;

  userDetails?: GuildParticipantDetailsResDto;
  guildDetails?: GuildDetailsResDto;

  selectedLang$ = this._languageSwitcherService.selectedLang$;

  readonly floatUiStyles = floatUiConfig.floatUiStyles;
  readonly defaultPrefix = 'vsph.clientCommon.client';

  constructor(
    private readonly _participantService: ParticipantService,
    private readonly _languageSwitcherService: LanguageSwitcherService,
    private readonly _guildService: GuildService,
    private readonly _store: Store<ClientReducer>,
    _themeSwitcherService: ThemeSwitcherService
  ) {
    super(_themeSwitcherService);
  }

  ngOnInit(): void {
    this.loadBrandThemedIcon();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleFetchUserDetails(): void {
    if (this.guildId && this.userId) {
      this.wrapAsObservable$(
        this._participantService.getParticipantDetails$(
          this.guildId,
          this.userId
        )
      ).subscribe({
        next: userDetails => (this.userDetails = userDetails),
        error: () => this.userDetailsTooltipContent?.hide(),
      });
      this.wrapAsObservable$(this._guildService.guildDetails$).subscribe(
        guildDetails => (this.guildDetails = guildDetails)
      );
    }
  }

  handleClearUserDetailsContext(): void {
    this.userDetails = undefined;
  }

  handleOpenModalToKickMember(): void {
    this.openSelectedModal('kick');
  }

  handleOpenModalToBanMember(): void {
    this.openSelectedModal('ban');
  }

  handleOpenModalToLeaveSphere(): void {
    if (this.guildDetails) {
      this._store.dispatch(
        NgrxAction_CLN.__openDevastateMemberModal({
          modal: 'leave',
          id: this.guildDetails.id,
          name: this.guildDetails.name,
        })
      );
      this.userDetailsTooltipContent?.hide();
    }
  }

  private openSelectedModal(modal: DevastateMemberModal): void {
    if (this.userDetails) {
      this._store.dispatch(
        NgrxAction_CLN.__openDevastateMemberModal({
          modal,
          id: this.userDetails.id,
          name: this.userDetails.fullName,
        })
      );
      this.userDetailsTooltipContent?.hide();
    }
  }
}
