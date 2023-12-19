/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { NgxTippyProps } from 'ngx-tippy-wrapper';

@Component({
  selector: 'vsph-input-text-area',
  templateUrl: './input-text-area.component.html',
  host: { class: 'flex gap-x-3 p-4' },
})
export class InputTextAreaComponent {
  userMessage = '';

  readonly maxLenght = 2000;
  readonly defaultPrefix = 'vsph.clientCommon.guild.textArea';
  readonly tooltipProps: NgxTippyProps = {
    placement: 'top',
    theme: 'vsph-auth',
    animation: 'scale-subtle',
  };

  handleAddFilesToMessage(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    console.log(files);
  }

  handleSendMessage(): void {
    console.log(this.userMessage);
  }
}
