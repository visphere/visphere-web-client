/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 * Silesian University of Technology
 *
 *    File name: local-storage.service.ts
 *    Last modified: 7/4/23, 8:54 PM
 *    Project name: moonsphere
 *    Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This is a project completing a
 * engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */

import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { StorageKeyType } from '~/shared-mod/types/storage-key.type';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private localStorage: Storage;

  constructor(@Inject(DOCUMENT) private readonly _document: Document) {
    if (!this._document.defaultView) {
      throw new Error('Default window environment not found!');
    }
    this.localStorage = this._document.defaultView.localStorage;
  }

  get<T>(storageKey: StorageKeyType): T | null {
    const preParsed = this.localStorage.getItem(storageKey);
    if (!preParsed) return null;
    return JSON.parse(preParsed);
  }

  save<T>(storageKey: StorageKeyType, data: T): void {
    this.localStorage.removeItem(storageKey);
    this.localStorage.setItem(storageKey, JSON.stringify(data));
  }

  remove(storageKey: StorageKeyType): void {
    this.localStorage.removeItem(storageKey);
  }

  update(storageKey: StorageKeyType, field: string, newValue: any): void {
    const parsed: any = this.get(storageKey);
    if (!parsed) return;
    parsed[field] = newValue;
    this.save(storageKey, parsed);
  }
}
