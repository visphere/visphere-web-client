/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TextChannelDetailsResDto } from '~/client-mod/model/text-channel.model';
import { TextChannelService } from '~/client-mod/services/text-channel/text-channel.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-sphere-text-channel-page',
  templateUrl: './sphere-text-channel-page.component.html',
  host: { class: 'vsph-center-content__container' },
})
export class SphereTextChannelPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  textChannelDetails?: TextChannelDetailsResDto;

  readonly defaultPrefix = 'vsph.clientCommon.guild.textChannel';

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _textChannelService: TextChannelService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._textChannelService.fetchTextChannelDetails$(this._route.paramMap)
    ).subscribe({
      next: textChannelDetails =>
        (this.textChannelDetails = textChannelDetails),
      error: async () => this._router.navigateByUrl('/'),
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
