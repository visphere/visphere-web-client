/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuildDetailsResDto } from '~/client-mod/model/guild.model';
import { MessagePayloadResDto } from '~/client-mod/model/message.model';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { MessagesService } from '~/client-mod/services/messages/messages.service';
import { ParticipantService } from '~/client-mod/services/participant/participant.service';
import { WsService } from '~/client-mod/services/ws/ws.service';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { PasswordConfirmationService } from '~/shared-mod/services/password-confirmation/password-confirmation.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-sphere-messages-content',
  templateUrl: './sphere-messages-content.component.html',
  providers: [ParticipantService, PasswordConfirmationService],
})
export class SphereMessagesContentComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  guildDetails?: GuildDetailsResDto;
  messages: MessagePayloadResDto[] = [];

  selectedLang$ = this._languageSwitcherService.selectedLang$;

  constructor(
    private readonly _wsService: WsService,
    private readonly _route: ActivatedRoute,
    private readonly _messagesService: MessagesService,
    private readonly _guildService: GuildService,
    private readonly _languageSwitcherService: LanguageSwitcherService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(this._guildService.guildDetails$).subscribe(
      guildDetails => (this.guildDetails = guildDetails)
    );
    this.wrapAsObservable$(
      this._messagesService.resetOffsetOnChangePage$(this._route)
    ).subscribe(() => (this.messages = []));
    this.wrapAsObservable$(
      this._messagesService.fetchMessagesWithOffset$(this._route)
    ).subscribe(messages => (this.messages = [...messages, ...this.messages]));
    this.wrapAsObservable$(
      this._wsService.observableMessagesStream$()
    ).subscribe(message => this.messages.push(message));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
