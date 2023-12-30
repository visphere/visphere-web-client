/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { WsService } from '~/client-mod/services/ws/ws.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-input-text-area',
  templateUrl: './input-text-area.component.html',
  host: { class: 'flex gap-x-3 p-4' },
})
export class InputTextAreaComponent
  extends AbstractReactiveProvider
  implements OnDestroy
{
  @ViewChild('resizableTextAreaRef', { static: true })
  resizableTextAreaRef?: ElementRef;

  userMessage = '';

  readonly maxLenght = 2000;
  readonly defaultPrefix = 'vsph.clientCommon.guild.textArea';
  readonly tooltipProps: NgxTippyProps = {
    placement: 'top',
    theme: 'vsph-auth',
    animation: 'scale-subtle',
  };

  constructor(private readonly _wsServie: WsService) {
    super();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  @HostListener('document:keydown', ['$event'])
  handleSendViaKey(event: KeyboardEvent): void {
    this._wsServie.sendMessageOnKeyPress(event, () => {
      if (this.userMessage) {
        this.handleSendMessage();
      }
    });
  }

  handleAddFilesToMessage(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    console.log(files);
  }

  handleSendMessage(): void {
    this.wrapAsObservable$(
      this._wsServie.sendMessage$(this.userMessage)
    ).subscribe({
      next: () => {
        this.userMessage = '';
        this.resizableTextAreaRef!.nativeElement.style.height = '42px';
      },
    });
  }
}
