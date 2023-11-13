/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Observable, combineLatest } from 'rxjs';
import { environment } from '~/env/environment';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-agree-terms-content',
  templateUrl: './agree-terms-content.component.html',
})
export class AgreeTermsContentComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() i18nPrefix = 'webClient.registerPage';

  formGroup!: FormGroup;
  agreeTermsContent$?: Observable<SafeHtml>;
  path = environment.baseLandingUrl;

  constructor(
    private readonly _translateService: TranslateService,
    private readonly _languageSwitcherService: LanguageSwitcherService,
    private readonly _populateFormGroupService: PopulateFormGroupService
  ) {
    super();
  }

  ngOnInit(): void {
    this.agreeTermsContent$ = this.generateTermsContent();
    this.wrapAsObservable(
      combineLatest([
        this._languageSwitcherService.selectedLang$,
        this._populateFormGroupService.field$,
      ])
    ).subscribe(([lang, formGroup]) => {
      this.formGroup = formGroup;
      this.path = `${environment.baseLandingUrl}${lang.landingPrefix}`;
      this.agreeTermsContent$ = this.generateTermsContent();
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  private generateTermsContent(): Observable<string> {
    const termsHref = this.generateBaseUrl('terms-and-conditions', 'terms');
    const privacyPolicyHref = this.generateBaseUrl(
      'privacy-policy',
      'privacyPolicy'
    );
    return this._translateService.get(
      'vsph.webClient.registerPage.formFields.agreeTerms.value',
      { termsUrl: termsHref, privacyPolicyUrl: privacyPolicyHref }
    );
  }

  private generateBaseUrl(path: string, i18nPlaceholder: string): string {
    return `<a href="${
      this.path
    }/${path}" target="_blank" class="vsph-auth__link">
            ${this._translateService.instant(
              'vsph.webClient.registerPage.formFields.agreeTerms.' +
                i18nPlaceholder
            )}
        </a>`;
  }
}
