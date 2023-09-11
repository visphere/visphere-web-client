/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

@Injectable({ providedIn: 'root' })
export class ModalUtilsService {
  constructor(@Inject(DOCUMENT) private readonly _document: Document) {}

  blockBodyScroll(isBlocking: boolean): void {
    if (isBlocking) {
      disableBodyScroll(this._document.documentElement);
    } else {
      enableBodyScroll(this._document.documentElement);
    }
  }
}
