/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy } from '@angular/core';
import { TextChannelService } from '~/settings-mod/services/text-channel/text-channel.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-text-channel-overview-settings-page',
  templateUrl: './text-channel-overview-settings-page.component.html',
})
export class TextChannelOverviewSettingsPageComponent
  extends AbstractReactiveProvider
  implements OnDestroy
{
  isFetching$ = this._textChannelService.isFetching$;

  constructor(private readonly _textChannelService: TextChannelService) {
    super();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
