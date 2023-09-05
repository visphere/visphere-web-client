/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: modal.service.ts
 *   Created at: 2023-09-04, 13:14:10
 *   Last updated at: 2023-09-04, 13:14:10
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
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
