/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'vsph-image-loader-modal',
  templateUrl: './image-loader-modal.component.html',
})
export class ImageLoaderModalComponent {
  @Input() isActive = false;
  @Input() i18nPrefix = '';
  @Input() isLoading = false;

  @Output() handleEmitOnClose = new EventEmitter<void>();
  @Output() handleEmitOnUpload = new EventEmitter<File>();

  submitDisabled = true;
}
