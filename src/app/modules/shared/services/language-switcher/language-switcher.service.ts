/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 * Silesian University of Technology
 *
 *    File name: language-switcher.service.ts
 *    Last modified: 7/4/23, 8:41 PM
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

import { APP_INITIALIZER, Inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { StorageKeyType } from '~/shared-mod/types/storage-key.type';
import {
  AVAILABLE_TRANSLATIONS,
  ITranslation,
} from '~/shared-mod/types/translation.type';

import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable({ providedIn: 'root' })
export class LanguageSwitcherService {
  private _availableLangs = AVAILABLE_TRANSLATIONS;
  private _selectedLang$: BehaviorSubject<ITranslation> = new BehaviorSubject(
    this.getTranslation(navigator.language)
  );

  constructor(
    private readonly _meta: Meta,
    @Inject(DOCUMENT) private readonly _document: Document,
    private readonly _translateService: TranslateService,
    private readonly _localStorageService: LocalStorageService
  ) {}

  changeLang(translation: ITranslation): void {
    if (!this.getFlattenTranslations().includes(translation.lang)) return;
    this.updateProps(translation);
    this._localStorageService.save(StorageKeyType.SELECTED_LANG, {
      lang: translation.lang,
    });
  }

  loadLang(): void {
    this._translateService.addLangs(this.getFlattenTranslations());
    const savedLang: { lang: string } | null = this._localStorageService.get(
      StorageKeyType.SELECTED_LANG
    );
    const loadedLang = savedLang ? savedLang.lang : navigator.language;
    this.updateProps(this.getTranslation(loadedLang));
  }

  private changeMetaProperties(loadedLang: string): void {
    document.documentElement.lang = loadedLang;
    this.updateMetaName('description', 'mpsh.metaProperty.description');
    this.updateMetaName('keywords', 'mpsh.metaProperty.keywords');
    this.updateMetaProperty('og:description', 'mpsh.metaProperty.description');
    this.updateMetaProperty(
      'twitter:description',
      'mpsh.metaProperty.description'
    );
    this.updateManifestLangFile(loadedLang);
  }

  private updateMetaName(name: string, placeholder: string): void {
    const content = this._translateService.instant(placeholder);
    this._meta.updateTag({ name, content });
  }

  private updateMetaProperty(property: string, placeholder: string): void {
    const content = this._translateService.instant(placeholder);
    this._meta.updateTag({ property, content });
  }

  private updateManifestLangFile(seletedLang: string): void {
    const manifestTagElement = this._document.getElementById('manifest');
    if (!manifestTagElement) return;
    manifestTagElement.setAttribute(
      'href',
      `/assets/manifest/${seletedLang}/pwa-manifest.json`
    );
  }

  private updateProps(translation: ITranslation): void {
    this._translateService
      .use(translation.lang)
      .subscribe(() => this.changeMetaProperties(translation.lang));
    this._selectedLang$.next(translation);
  }

  private getFlattenTranslations(): string[] {
    return this._availableLangs.map(l => l.lang);
  }

  private getTranslation(lang: string): ITranslation {
    return this._availableLangs.find(l => l.lang === lang)!;
  }

  get selectedLang$(): Observable<ITranslation> {
    return this._selectedLang$.asObservable();
  }
  get availableLangs(): ITranslation[] {
    return this._availableLangs;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function languageSwitcherInitFactory(
  langSwitcher: LanguageSwitcherService
): () => void {
  return () => langSwitcher.loadLang();
}

export const languageSwitcherInitializer = {
  provide: APP_INITIALIZER,
  useFactory: languageSwitcherInitFactory,
  deps: [LanguageSwitcherService],
  multi: true,
};
