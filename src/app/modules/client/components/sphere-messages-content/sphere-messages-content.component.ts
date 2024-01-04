/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { GuildDetailsResDto } from '~/client-mod/model/guild.model';
import {
  FileAttachment,
  MessagePayloadResDto,
} from '~/client-mod/model/message.model';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { MessagesService } from '~/client-mod/services/messages/messages.service';
import { ParticipantService } from '~/client-mod/services/participant/participant.service';
import { WsService } from '~/client-mod/services/ws/ws.service';
import {
  actionSetDeletingMessageContent,
  actionSetViewedImageDetails,
} from '~/client-mod/store/actions';
import { ClientReducer } from '~/client-mod/types/ngx-store.type';
import { getFontAwesomeIconFromMime } from '~/client-mod/utils/mime-converter';
import { LoggedUser } from '~/shared-mod/models/logged-user.model';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { PasswordConfirmationService } from '~/shared-mod/services/password-confirmation/password-confirmation.service';
import { selectLoggedUser } from '~/shared-mod/store/selectors';
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
  hoveredMessageId = '';
  loggedUser?: LoggedUser;

  selectedLang$ = this._languageSwitcherService.selectedLang$;
  activeLoading$ = this._messagesService.activeLoading$;

  readonly defaultPrefix = 'vsph.clientCommon.client';
  readonly tooltipProps: NgxTippyProps = {
    placement: 'left',
    theme: 'vsph-auth',
    animation: 'scale-subtle',
  };

  constructor(
    private readonly _wsService: WsService,
    private readonly _route: ActivatedRoute,
    private readonly _messagesService: MessagesService,
    private readonly _guildService: GuildService,
    private readonly _languageSwitcherService: LanguageSwitcherService,
    private readonly _store: Store<ClientReducer>
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
    this.wrapAsObservable$(this._store.select(selectLoggedUser)).subscribe(
      loggedUser => (this.loggedUser = loggedUser ?? undefined)
    );
    this.wrapAsObservable$(
      this._wsService.observableRemoveMessagesStream$()
    ).subscribe(
      deletedMessageId =>
        (this.messages = this.messages.filter(
          ({ messageId }) => messageId !== deletedMessageId
        ))
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  isFirstMessage(
    message: MessagePayloadResDto,
    prevMessage: MessagePayloadResDto | undefined
  ): boolean {
    if (!prevMessage) {
      return true;
    }
    const messageDate = moment(message.sendDate).startOf('minute');
    const prevMessageDate = moment(prevMessage.sendDate).startOf('minute');
    return !(
      messageDate.isSame(prevMessageDate) &&
      message.userId === prevMessage.userId
    );
  }

  handleOpenImageModal(imageAttachment: FileAttachment): void {
    this._store.dispatch(
      actionSetViewedImageDetails({ details: imageAttachment })
    );
  }

  handleOnHoverMessage(messageId: string): void {
    this.hoveredMessageId = messageId;
  }

  handleDownloadFile(fileAttachment: FileAttachment): void {
    window.open(fileAttachment.path, '_blank');
  }

  handleRemoveMessage(messageContent: MessagePayloadResDto): void {
    this._store.dispatch(actionSetDeletingMessageContent({ messageContent }));
  }

  getFileIcon(mime: string): IconDefinition {
    return getFontAwesomeIconFromMime(mime);
  }
}
