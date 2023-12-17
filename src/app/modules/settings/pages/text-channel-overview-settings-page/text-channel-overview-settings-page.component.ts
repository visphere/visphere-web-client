/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractReactiveProvider } from '~/root-mod/modules/shared/utils/abstract-reactive-provider';
import { TextChannelService } from '../../services/text-channel/text-channel.service';

@Component({
  selector: 'vsph-text-channel-overview-settings-page',
  templateUrl: './text-channel-overview-settings-page.component.html',
})
export class TextChannelOverviewSettingsPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  isFetching$ = this._textChannelService.isFetching$;

  constructor(private readonly _textChannelService: TextChannelService) {
    super();
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}