/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SphereGuildService } from '~/settings-mod/services/sphere-guild/sphere-guild.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-guild-overview-settings-page',
  templateUrl: './guild-overview-settings-page.component.html',
})
export class GuildOverviewSettingsPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  isFetching$ = this._sphereGuildService.isFetching$;

  constructor(private readonly _sphereGuildService: SphereGuildService) {
    super();
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}