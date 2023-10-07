/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { StorageKeyType } from '~/shared-mod/types/storage-key.type';

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
    if (!preParsed) {
      return null;
    }
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
    if (!parsed) {
      return;
    }
    parsed[field] = newValue;
    this.save(storageKey, parsed);
  }

  push<T>(storageKey: StorageKeyType, newValue: T): void {
    const parsed: T[] | null = this.get(storageKey);
    if (!parsed) {
      return;
    }
    parsed.push(newValue);
    this.save(storageKey, parsed);
  }
}
