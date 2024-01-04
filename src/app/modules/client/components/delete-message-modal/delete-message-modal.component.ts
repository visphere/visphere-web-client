/*
 * Copyright (c) 2024 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Store } from '@ngrx/store';
import { MessagePayloadResDto } from '~/client-mod/model/message.model';
import { MessagesService } from '~/client-mod/services/messages/messages.service';
import { __setDeletingMessageContent } from '~/client-mod/store/actions';
import { selectDeletingMessageContent } from '~/client-mod/store/selectors';
import { ClientReducer } from '~/client-mod/types/ngx-store.type';
import { getFontAwesomeIconFromMime } from '~/client-mod/utils/mime-converter';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-delete-message-modal',
  templateUrl: './delete-message-modal.component.html',
})
export class DeleteMessageModalComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  deletingMessageContent?: MessagePayloadResDto;

  selectedLang$ = this._languageSwitcherService.selectedLang$;
  activeLoading$ = this._messagesService.activeLoading$;

  readonly defaultPrefix = 'vsph.clientCommon.client';

  constructor(
    private readonly _store: Store<ClientReducer>,
    private readonly _messagesService: MessagesService,
    private readonly _languageSwitcherService: LanguageSwitcherService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._store.select(selectDeletingMessageContent)
    ).subscribe(deletingMessageContent => {
      this.deletingMessageContent = deletingMessageContent;
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleCloseDeleteMessageModal(): void {
    this._store.dispatch(
      __setDeletingMessageContent({ messageContent: undefined })
    );
  }

  handleDeleteMessageAccount(): void {
    if (this.deletingMessageContent) {
      this.wrapAsObservable$(
        this._messagesService.deleteMessage$(
          this.deletingMessageContent.messageId
        )
      ).subscribe({ next: () => this.handleCloseDeleteMessageModal() });
    }
  }

  getFileIcon(mime: string): IconDefinition {
    return getFontAwesomeIconFromMime(mime);
  }
}
