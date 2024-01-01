/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuildParticipantsResDto } from '~/client-mod/model/participant.model';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { ParticipantService } from '~/client-mod/services/participant/participant.service';
import { environment } from '~/env/environment';
import { PasswordConfirmationService } from '~/shared-mod/services/password-confirmation/password-confirmation.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-sphere-guild-participants-panel',
  templateUrl: './sphere-guild-participants-panel.component.html',
  host: {
    class:
      'vsph-side-content__container bg-vsph-light-300 dark:bg-vsph-dark-800',
  },
  providers: [PasswordConfirmationService, ParticipantService],
})
export class SphereGuildParticipantsPanelComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  guildParticipants?: GuildParticipantsResDto;

  isFetching$ = this._participantService.isFetching$;

  readonly defaultPrefix = 'vsph.clientCommon.guild.rightSidebar';
  readonly path = environment.contentDistributorBaseUrl;

  constructor(
    private readonly _participantService: ParticipantService,
    private readonly _guildService: GuildService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._participantService.fetchGuildParticipants$()
    ).subscribe({
      next: guildParticipants => (this.guildParticipants = guildParticipants),
      error: async () => await this._router.navigateByUrl('/'),
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleLeaveGuild(deleteAllMessages: boolean): void {
    this.wrapAsObservable$(
      this._participantService.leaveGuild$(deleteAllMessages)
    ).subscribe({
      next: async () => {
        this._guildService.updateWsSignalValue();
        await this._router.navigateByUrl('/');
      },
    });
  }

  handleKickMember(deleteAllMessages: boolean): void {
    if (this.guildParticipants) {
      this.wrapAsObservable$(
        this._participantService.kickFromGuild$(
          this.guildParticipants.guildId,
          deleteAllMessages
        )
      ).subscribe();
    }
  }

  handleBanMember(deleteAllMessages: boolean): void {
    if (this.guildParticipants) {
      this.wrapAsObservable$(
        this._participantService.banFromGuild$(
          this.guildParticipants.guildId,
          deleteAllMessages
        )
      ).subscribe();
    }
  }
}
