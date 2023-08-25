/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: language-switcher.service.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 20:53:38
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
import { APP_INITIALIZER, Inject, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '~/shared-mod/services/local-storage/local-storage.service';
import {
  AVAILABLE_TRANSLATIONS,
  TranslationRow,
} from '~/shared-mod/types/translation.type';

@Injectable({ providedIn: 'root' })
export class LanguageSwitcherService {
  private _availableLangs = AVAILABLE_TRANSLATIONS;
  private _selectedLang$: BehaviorSubject<TranslationRow> = new BehaviorSubject(
    this.getTranslation(navigator.language)
  );

  constructor(
    private readonly _meta: Meta,
    private readonly _router: Router,
    @Inject(DOCUMENT) private readonly _document: Document,
    private readonly _translateService: TranslateService,
    private readonly _localStorageService: LocalStorageService
  ) {}

  changeLang(translation: TranslationRow): void {
    if (!this.getFlattenTranslations().includes(translation.lang)) return;
    this.updateProps(translation);
    this._localStorageService.save('selectedLang', {
      lang: translation.lang,
    });
  }

  async loadLang(): Promise<void> {
    this._translateService.addLangs(this.getFlattenTranslations());
    const searchParams = new URLSearchParams(window.location.search);
    const proxyLang = searchParams.get('lang');
    const savedLang: { lang: string } | null =
      this._localStorageService.get('selectedLang');
    let loadedLang;
    if (
      proxyLang &&
      AVAILABLE_TRANSLATIONS.some(({ lang }) => lang === proxyLang)
    ) {
      loadedLang = proxyLang;
    } else {
      loadedLang = savedLang ? savedLang.lang : navigator.language;
    }
    this.updateProps(this.getTranslation(loadedLang));
    await this._router.navigate([window.location.pathname]);
  }

  private changeMetaProperties(loadedLang: string): void {
    document.documentElement.lang = loadedLang;
    this.updateMetaName(
      'description',
      'msph.webCommon.metaProperty.description'
    );
    this.updateMetaName('keywords', 'msph.webCommon.metaProperty.keywords');
    this.updateMetaProperty(
      'og:description',
      'msph.webCommon.metaProperty.description'
    );
    this.updateMetaProperty(
      'twitter:description',
      'msph.webCommon.metaProperty.description'
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

  private updateProps(translation: TranslationRow): void {
    this._translateService
      .use(translation.lang)
      .subscribe(() => this.changeMetaProperties(translation.lang));
    this._selectedLang$.next(translation);
  }

  private getFlattenTranslations(): string[] {
    return this._availableLangs.map(l => l.lang);
  }

  private getTranslation(lang: string): TranslationRow {
    return this._availableLangs.find(l => l.lang === lang)!;
  }

  get selectedLang$(): Observable<TranslationRow> {
    return this._selectedLang$.asObservable();
  }
  get availableLangs(): TranslationRow[] {
    return this._availableLangs;
  }
}

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
