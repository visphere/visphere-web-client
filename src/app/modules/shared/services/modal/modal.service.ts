/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ModalService {
  private _isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(@Inject(DOCUMENT) private readonly _document: Document) {}

  setIsOpen(isOpen: boolean): void {
    if (isOpen) {
      disableBodyScroll(this._document.documentElement);
    } else {
      enableBodyScroll(this._document.documentElement);
    }
    this._isOpen$.next(isOpen);
  }

  get isOpen$(): Observable<boolean> {
    return this._isOpen$.asObservable();
  }
}
