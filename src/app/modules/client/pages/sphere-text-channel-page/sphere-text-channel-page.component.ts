/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TextChannelDetailsResDto } from '~/client-mod/model/text-channel.model';
import { MessagesService } from '~/client-mod/services/messages/messages.service';
import { TextChannelService } from '~/client-mod/services/text-channel/text-channel.service';
import { WsService } from '~/client-mod/services/ws/ws.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-sphere-text-channel-page',
  templateUrl: './sphere-text-channel-page.component.html',
  host: { class: 'vsph-center-content__container' },
  providers: [WsService, MessagesService],
})
export class SphereTextChannelPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  textChannelDetails?: TextChannelDetailsResDto;

  isPaginationEnd$ = this._messagesService.isPaginationEnd$;
  isLoading$ = this._messagesService.isLoading$;

  readonly defaultPrefix = 'vsph.clientCommon.guild.textChannel';
  readonly throttle = 300;
  readonly scrollUpDistance = -9;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _textChannelService: TextChannelService,
    private readonly _router: Router,
    private readonly _wsService: WsService,
    private readonly _messagesService: MessagesService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._textChannelService.fetchTextChannelDetails$(this._route.paramMap)
    ).subscribe({
      next: textChannelDetails => {
        this.textChannelDetails = textChannelDetails;
        this.wrapAsObservable$(
          this._wsService.initSocket$(this._route.paramMap)
        ).subscribe();
      },
      error: async () => this._router.navigateByUrl('/'),
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleFetchNextMessages(): void {
    this._messagesService.increaseOffset();
  }
}
