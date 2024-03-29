/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
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
  private _selectedLang$ = new BehaviorSubject(
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
    if (!this.getFlattenTranslations().includes(translation.lang)) {
      return;
    }
    this.updateProps(translation);
    this._localStorageService.save('selectedLang', {
      lang: translation.lang,
    });
  }

  changeLangByName(selectedLang: string) {
    const changedLang = this.availableLangs.find(
      ({ lang }) => lang === selectedLang
    );
    if (changedLang) {
      this.changeLang(changedLang);
    }
  }

  async loadLang(): Promise<void> {
    this._translateService.addLangs(this.getFlattenTranslations());

    const searchParams = new URLSearchParams(window.location.search);
    const proxyLang = searchParams.get('lang');
    searchParams.delete('lang');

    const url = new URL(window.location.href);
    const newUrl = `${url.pathname}?${searchParams.toString()}`;

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
    await this._router.navigateByUrl(newUrl);
  }

  private changeMetaProperties(loadedLang: string): void {
    document.documentElement.lang = loadedLang;
    this.updateMetaName(
      'description',
      'vsph.webCommon.metaProperty.description'
    );
    this.updateMetaName('keywords', 'vsph.webCommon.metaProperty.keywords');
    this.updateMetaProperty(
      'og:description',
      'vsph.webCommon.metaProperty.description'
    );
    this.updateMetaProperty(
      'twitter:description',
      'vsph.webCommon.metaProperty.description'
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
