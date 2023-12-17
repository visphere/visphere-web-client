/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GuildJoinLinksService } from '~/settings-mod/services/guild-join-links/guild-join-links.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-guild-join-links-settings-page',
  templateUrl: './guild-join-links-settings-page.component.html',
  providers: [GuildJoinLinksService],
})
export class GuildJoinLinksSettingsPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  isFetching$ = this._guildJoinLinksService.isFetching$;

  constructor(private readonly _guildJoinLinksService: GuildJoinLinksService) {
    super();
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
