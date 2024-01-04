/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { MessageFilesService } from '~/client-mod/services/message-files/message-files.service';
import { MessagesService } from '~/client-mod/services/messages/messages.service';
import { getFontAwesomeIconFromMime } from '~/client-mod/utils/mime-converter';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-input-text-area',
  templateUrl: './input-text-area.component.html',
  host: { class: 'flex gap-x-[12px] p-[16px] w-full' },
})
export class InputTextAreaComponent
  extends AbstractReactiveProvider
  implements AfterViewInit, OnDestroy
{
  @ViewChild('fileInputRef', { static: true }) fileInputRef?: ElementRef;
  @ViewChild('textAreaRef', { static: true }) textAreaRef?: ElementRef;

  userMessage = '';
  appendFiles = this._messageFilesService.appendFiles;
  filesContainerWidth = 0;

  activeLoading$ = this._messagesService.activeLoading$;

  readonly maxLenght = 2000;
  readonly maxFiles = this._messageFilesService.maxFiles;
  readonly defaultPrefix = 'vsph.clientCommon.guild.textArea';
  readonly tooltipProps: NgxTippyProps = {
    placement: 'top',
    theme: 'vsph-auth',
    animation: 'scale-subtle',
  };

  constructor(
    private readonly _messagesService: MessagesService,
    private readonly _messageFilesService: MessageFilesService
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.filesContainerWidth = this.textAreaRef?.nativeElement.offsetWidth;
    this._messageFilesService.setFileInputRef(this.fileInputRef);
  }

  ngOnDestroy(): void {
    this._messageFilesService.revokeAllBlobObjects();
    this.unmountAllSubscriptions();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.filesContainerWidth = this.textAreaRef?.nativeElement.offsetWidth;
  }

  @HostListener('document:keydown', ['$event'])
  handleSendViaKey(event: KeyboardEvent): void {
    this._messagesService.handleKeyPressAction(
      this.userMessage,
      this.appendFiles,
      event,
      () => this.handleSendMessage()
    );
  }

  handleAddFilesToMessage(event: Event): void {
    this._messageFilesService.addFilesToMessage(event);
  }

  handleOnPasteImage(event: ClipboardEvent): void {
    this._messageFilesService.addFilesByPaste(event);
  }

  handleRemoveFile(index: number): void {
    this._messageFilesService.removeFile(index);
  }

  handleSendMessage(): void {
    this.wrapAsObservable$(
      this._messagesService.sendVariousMessage$(
        this.userMessage,
        this.appendFiles
      )
    ).subscribe({
      next: () => {
        this.userMessage = '';
        this._messageFilesService.clearFileList();
        this.textAreaRef!.nativeElement.style.height = '42px';
      },
    });
  }

  getFileIcon(mime: string): IconDefinition {
    return getFontAwesomeIconFromMime(mime);
  }
}
