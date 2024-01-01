/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { GuildDetailsResDto } from '~/client-mod/model/guild.model';
import { TextChannelResDto } from '~/client-mod/model/text-channel.model';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { TextChannelService } from '~/client-mod/services/text-channel/text-channel.service';
import * as NgrxAction_CLN from '~/client-mod/store/actions';
import { ClientReducer } from '~/client-mod/types/ngx-store.type';
import { environment } from '~/env/environment';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-sphere-text-channels-panel',
  templateUrl: './sphere-text-channels-panel.component.html',
  host: {
    class:
      'vsph-side-content__container bg-vsph-light-300 dark:bg-vsph-dark-900',
  },
})
export class SphereTextChannelsPanelComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  guildDetails?: GuildDetailsResDto;
  textChannels: TextChannelResDto[] = [];

  isFetching$ = this._textChannelService.isFetching$;

  readonly path = environment.contentDistributorBaseUrl;
  readonly defaultPrefix = 'vsph.clientCommon.guild.leftSidebar';
  readonly tooltipProps: NgxTippyProps = {
    placement: 'right',
    theme: 'vsph-auth',
    animation: 'scale-subtle',
  };

  constructor(
    private readonly _router: Router,
    private readonly _store: Store<ClientReducer | SharedReducer>,
    private readonly _guildService: GuildService,
    private readonly _textChannelService: TextChannelService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(this._guildService.guildDetails$).subscribe(
      guildDetails => (this.guildDetails = guildDetails)
    );
    this.wrapAsObservable$(
      this._textChannelService.fetchGuildTextChannels$()
    ).subscribe(textChannels => (this.textChannels = textChannels));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleOpenModalToCreateTextChannel(): void {
    this._store.dispatch(
      NgrxAction_CLN.__openSelectedModal({ modal: 'add-text-channel' })
    );
  }

  async handleGotoSphereSettings(): Promise<void> {
    this.saveUrlAndNavigateTo(`guild/${this.guildDetails?.id}`);
  }

  async handleGotoTextChannelSettings(textChannelId: number): Promise<void> {
    this.saveUrlAndNavigateTo(
      `guild/${this.guildDetails?.id}/text-channel/${textChannelId}`
    );
  }

  isActiveRoute(textChannelId: number): boolean {
    return this._router.isActive(this.createRoute(textChannelId), {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  createRoute(textChannelId: number): string {
    return `/guild/${this.guildDetails?.id}/channel/${textChannelId}`;
  }

  private async saveUrlAndNavigateTo(destinationUrl: string): Promise<void> {
    this._store.dispatch(
      NgrxAction_SHA.__setSettingsReturnUrl({ url: this._router.url })
    );
    await this._router.navigateByUrl(`/settings/${destinationUrl}/overview`);
  }
}
