/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JoiningGuildDetailsResDto } from '~/client-mod/model/join-guild.model';
import { JoinLinkService } from '~/client-mod/services/join-link/join-link.service';
import { environment } from '~/env/environment';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-join-to-guild-page',
  templateUrl: './join-to-guild-page.component.html',
  host: { class: 'flex' },
  providers: [JoinLinkService],
})
export class JoinToGuildPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  guildDetails?: JoiningGuildDetailsResDto;

  isFetching$ = this._joinLinkService.isFetching$;
  isLoading$ = this._joinLinkService.isLoading$;
  guildError$ = this._joinLinkService.guildError$;

  readonly path = environment.contentDistributorBaseUrl;
  readonly defaultPrefix = 'vsph.webClient.joinToSpherePage';

  constructor(
    private readonly _joinLinkService: JoinLinkService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._joinLinkService.fetchGuildDetails$(this._route)
    ).subscribe(guildDetails => (this.guildDetails = guildDetails));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleJoinToGuild(): void {
    this.wrapAsObservable$(this._joinLinkService.joinToGuild$()).subscribe({
      next: async guildId =>
        await this._router.navigateByUrl(`/guild/${guildId}`),
    });
  }
}
