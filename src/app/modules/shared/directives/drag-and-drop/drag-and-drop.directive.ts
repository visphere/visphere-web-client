/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({ selector: '[vsphDragAndDrop]' })
export class DragAndDropDirective {
  @Output() emitOnfileDropped = new EventEmitter<File>();
  @Output() emitOnDrag = new EventEmitter<boolean>();

  @HostListener('dragover', ['$event'])
  onDragOver(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.emitOnDrag.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.emitOnDrag.emit(false);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.emitOnDrag.emit(false);
    if (event.dataTransfer) {
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.emitOnfileDropped.emit(files[0]);
      }
    }
  }
}
