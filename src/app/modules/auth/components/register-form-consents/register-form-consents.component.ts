/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Observable, combineLatest } from 'rxjs';
import { environment } from '~/env/environment';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { SanitizePipe } from '~/shared-mod/pipes/sanitize/sanitize.pipe';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'msph-register-form-consents',
  templateUrl: './register-form-consents.component.html',
  providers: [SanitizePipe],
})
export class RegisterFormConsentsComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  selectAllToggle = false;
  agreeTermsContent: SafeHtml = '';
  formGroup!: FormGroup;
  path = environment.baseLandingUrl;

  formDisabled$: Observable<boolean> =
    this._populateFormGroupService.formDisabled$;

  constructor(
    private readonly _sanitizePipe: SanitizePipe,
    private readonly _translateService: TranslateService,
    private readonly _populateFormGroupService: PopulateFormGroupService,
    private readonly _languageSwitcherService: LanguageSwitcherService
  ) {
    super();
  }

  ngOnInit(): void {
    this.agreeTermsContent = this.generateTermsContent();

    this.wrapAsObservable(
      combineLatest([
        this._populateFormGroupService.field$,
        this._languageSwitcherService.selectedLang$,
      ])
    ).subscribe(([formGroup, lang]) => {
      this.formGroup = formGroup;
      this.path = `${environment.baseLandingUrl}${lang.landingPrefix}`;
      this.agreeTermsContent = this.generateTermsContent();
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleToggleAllValues(): void {
    const allowNotifsControl = this.formGroup.get('allowNotifs');
    const agreeTermsControl = this.formGroup.get('agreeTerms');
    if (!allowNotifsControl || !agreeTermsControl) {
      return;
    }
    this.selectAllToggle = !this.selectAllToggle;
    allowNotifsControl.patchValue(this.selectAllToggle);
    agreeTermsControl.patchValue(this.selectAllToggle);
    agreeTermsControl.setErrors(
      this.selectAllToggle ? null : { required: true }
    );
  }

  private generateTermsContent(): string {
    const termsHref = this.generateBaseUrl('terms-and-conditions', 'terms');
    const privacyPolicyHref = this.generateBaseUrl(
      'privacy-policy',
      'privacyPolicy'
    );
    return String(
      this._sanitizePipe.transform(
        this._translateService.instant(
          'msph.webClient.registerPage.formFields.agreeTerms.value',
          { termsUrl: termsHref, privacyPolicyUrl: privacyPolicyHref }
        )
      )
    );
  }

  private generateBaseUrl(path: string, i18nPlaceholder: string): string {
    return `<a href="${
      this.path
    }/${path}" target="_blank" class="text-msph-primary-tint hover:underline">
            ${this._translateService.instant(
              'msph.webClient.registerPage.formFields.agreeTerms.' +
                i18nPlaceholder
            )}
        </a>`;
  }
}
