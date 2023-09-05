/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: verify-captcha-modal.component.ts
 *   Created at: 2023-08-22, 19:54:08
 *   Last updated at: 2023-08-22, 19:54:21
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
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { environment } from '~/env/environment';
import { CaptchaVerificationService } from '~/shared-mod/services/captcha-verification/captcha-verification.service';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { ModalService } from '~/shared-mod/services/modal/modal.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { HcaptchaErrorEvent } from '~/shared-mod/types/hcaptcha.type';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'msph-verify-captcha-modal',
  templateUrl: './verify-captcha-modal.component.html',
  providers: [CaptchaVerificationService],
})
export class VerifyCaptchaModalComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() paragraph?: string;
  @Input() snackbarPlaceholder?: string;

  @Output() emitOnAccept: EventEmitter<boolean> = new EventEmitter();

  isActive$: Observable<boolean> = this._modalService.isOpen$;
  isLoading$: Observable<boolean> = this._captchaVerificationService.isLoading$;

  isActive = false;
  errorMessage = '';
  isCaptchaVisible = false;
  selectedLang = 'en';

  captchaSitekey = environment.hCaptchaSiteKey;
  allLanguages = this._languageSwitcherService.availableLangs;

  constructor(
    private readonly _store: Store<SharedReducer>,
    private readonly _translateService: TranslateService,
    private readonly _languageSwitcherService: LanguageSwitcherService,
    private readonly _captchaVerificationService: CaptchaVerificationService,
    private readonly _modalService: ModalService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable(
      this._languageSwitcherService.selectedLang$
    ).subscribe(({ lang }) => (this.selectedLang = lang));
    this.wrapAsObservable(this.isActive$).subscribe(isActive => {
      this.isActive = isActive;
      if (!isActive) {
        this.errorMessage = '';
        this.isCaptchaVisible = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleEmitOnClose(): void {
    if (this.snackbarPlaceholder) {
      this._store.dispatch(
        NgrxAction_SHA.__addSnackbar({
          content: {
            placeholder: this.snackbarPlaceholder,
          },
          severity: 'warning',
        })
      );
    }
  }

  handleShowHcaptchaWebcomponent(): void {
    this.isCaptchaVisible = this.isActive;
  }

  handleOnVerified(): void {
    this.wrapAsObservable(
      this._captchaVerificationService.submitForm()
    ).subscribe({
      next: () => this.emitOnAccept.emit(),
    });
  }

  handleOnError(event: HcaptchaErrorEvent): void {
    this.wrapAsObservable(
      this._translateService.get('msph.common.utils.unknowError')
    ).subscribe(message => (this.errorMessage = event.error || message));
  }
}
