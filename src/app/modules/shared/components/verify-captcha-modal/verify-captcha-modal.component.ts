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
import { BehaviorSubject, takeUntil } from 'rxjs';
import { environment } from '~/env/environment';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import { LanguageSwitcherService } from '../../services/language-switcher/language-switcher.service';
import { HcaptchaErrorEvent } from '../../types/hcaptcha.type';
import { SharedReducer } from '../../types/ngrx-store.type';
import { AbstractReactiveProvider } from '../../utils/abstract-reactive-provider';

@Component({
  selector: 'msph-verify-captcha-modal',
  templateUrl: './verify-captcha-modal.component.html',
})
export class VerifyCaptchaModalComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() isActive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  @Input() paragraph?: string;
  @Input() snackbarPlaceholder?: string;

  @Output() emitOnAccept: EventEmitter<boolean> = new EventEmitter();

  isActive = false;
  errorMessage = '';
  isCaptchaVisible = false;
  isVerified = false;
  selectedLang = 'en';
  responseTime?: Date;

  captchaSitekey = environment.hCaptchaSiteKey;
  allLanguages = this._languageSwitcherService.availableLangs;

  constructor(
    private readonly _store: Store<SharedReducer>,
    private readonly _translateService: TranslateService,
    private readonly _languageSwitcherService: LanguageSwitcherService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable(
      this._languageSwitcherService.selectedLang$
    ).subscribe(({ lang }) => (this.selectedLang = lang));
    this.wrapAsObservable(this.isActive$.asObservable()).subscribe(isActive => {
      this.isActive = isActive;
      if (!isActive) {
        this.isVerified = false;
        this.errorMessage = '';
        this.responseTime = undefined;
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

  handleOnVerified(event: Event): void {
    this.isVerified = true;
    this.responseTime = new Date(event.timeStamp / 60);
    setTimeout(() => {
      this.emitOnAccept.emit();
      this.isActive$?.next(false);
    }, 1000);
  }

  handleOnError(event: HcaptchaErrorEvent): void {
    this.responseTime = new Date(event.timeStamp / 60);
    this._translateService
      .get('msph.common.utils.unknowError')
      .pipe(takeUntil(this._subscriptionHook))
      .subscribe(message => (this.errorMessage = event.error || message));
  }
}
