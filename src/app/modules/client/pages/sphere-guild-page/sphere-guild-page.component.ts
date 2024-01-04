/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { TextChannelService } from '~/client-mod/services/text-channel/text-channel.service';
import { selectIsAddTextChannelModalOpen } from '~/client-mod/store/selectors';
import { ClientReducer } from '~/client-mod/types/ngx-store.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-sphere-guild-page',
  templateUrl: './sphere-guild-page.component.html',
  host: { class: 'flex flex-grow h-screen' },
  providers: [TextChannelService],
})
export class SphereGuildPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  isAddTextChannelModalOpen$ = this._store.select(
    selectIsAddTextChannelModalOpen
  );

  constructor(
    private readonly _store: Store<ClientReducer>,
    private readonly _guildService: GuildService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._guildService.fetchGuildDetails$(this._route.paramMap)
    ).subscribe({
      error: async () => this._router.navigateByUrl('/'),
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
