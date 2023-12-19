/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy } from '@angular/core';
import { GuildAppearanceService } from '~/settings-mod/services/guild-appearance/guild-appearance.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-guild-appearance-settings-page',
  templateUrl: './guild-appearance-settings-page.component.html',
  providers: [GuildAppearanceService],
})
export class GuildAppearanceSettingsPageComponent
  extends AbstractReactiveProvider
  implements OnDestroy
{
  isFetching$ = this._guildAppearanceService.isFetching$;

  constructor(
    private readonly _guildAppearanceService: GuildAppearanceService
  ) {
    super();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
