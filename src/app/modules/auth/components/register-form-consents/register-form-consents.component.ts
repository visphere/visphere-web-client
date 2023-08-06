/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 * Silesian University of Technology
 *
 *    File name: register-form-consents.component.ts
 *    Last modified: 7/13/23, 6:25 PM
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

import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { SafeHtml } from "@angular/platform-browser";
import { FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

import { takeUntil } from "rxjs";
import { environment } from "~/env/environment";

import { SanitizePipe } from "~/shared-mod/pipes/sanitize/sanitize.pipe";
import { AbstractReactiveProvider } from "~/shared-mod/utils/abstract-reactive-provider";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
    selector: "msph-register-form-consents",
    templateUrl: "./register-form-consents.component.html",
    providers: [ SanitizePipe ],
})
export class RegisterFormConsentsComponent extends AbstractReactiveProvider implements OnInit, OnDestroy {

    @Input() formGroup!: FormGroup;

    selectAllToggle = false;
    agreeTermsContent: SafeHtml = "";

    constructor(
        private readonly _sanitizePipe: SanitizePipe,
        private readonly _translateService: TranslateService,
    ) {
        super();
    };

    ngOnInit(): void {
        this.agreeTermsContent = this.generateTermsContent();
        this._translateService.onLangChange
            .pipe(takeUntil(this._subscriptionHook))
            .subscribe(() => this.agreeTermsContent = this.generateTermsContent());
    };

    ngOnDestroy(): void {
        this.unmountAllSubscriptions();
    };

    handleToggleAllValues(): void {
        const allowNotifsControl = this.formGroup.get("allowNotifs");
        const agreeTermsControl = this.formGroup.get("agreeTerms");
        if (!allowNotifsControl || !agreeTermsControl) return;

        this.selectAllToggle = !this.selectAllToggle;

        allowNotifsControl.patchValue(this.selectAllToggle);
        agreeTermsControl.patchValue(this.selectAllToggle);
        agreeTermsControl.setErrors(this.selectAllToggle ? null : { required: true });
    };

    private generateTermsContent(): string {
        const termsHref = this.generateBaseUrl("terms-and-conditions", "terms");
        const privacyPolicyHref = this.generateBaseUrl("privacy-policy", "privacyPolicy");
        return String(this._sanitizePipe.transform(this._translateService.instant(
            "msph.webClient.registerPage.formFields.agreeTerms.value",
            { "termsUrl": termsHref, "privacyPolicyUrl": privacyPolicyHref })));
    };

    private generateBaseUrl(path: string, i18nPlaceholder: string): string {
        return `<a href="${environment.baseLandingUrl}/${path}" target="_blank" class="text-msph-primary-tint hover:underline">
            ${this._translateService.instant("msph.webClient.registerPage.formFields.agreeTerms." + i18nPlaceholder)}
        </a>`;
    };
}
