/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
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
import { environment } from '~/env/environment';
import { CaptchaVerificationService } from '~/shared-mod/services/captcha-verification/captcha-verification.service';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { actionAddSnackbar } from '~/shared-mod/store/actions';
import { HcaptchaErrorEvent } from '~/shared-mod/types/hcaptcha.type';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-verify-captcha-modal',
  templateUrl: './verify-captcha-modal.component.html',
})
export class VerifyCaptchaModalComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() paragraph?: string;
  @Input() snackbarPlaceholder?: string;

  @Output() emitOnAccept = new EventEmitter();

  isActive$ = this._captchaVerificationService.isModalOpen$;
  isLoading$ = this._captchaVerificationService.isLoading$;

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
    private readonly _captchaVerificationService: CaptchaVerificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._languageSwitcherService.selectedLang$
    ).subscribe(({ lang }) => (this.selectedLang = lang));
    this.wrapAsObservable$(this.isActive$).subscribe(isActive => {
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
    this._captchaVerificationService.setModalVisibility(false);
    if (this.snackbarPlaceholder) {
      this._store.dispatch(
        actionAddSnackbar({
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
    this.wrapAsObservable$(
      this._captchaVerificationService.submitForm$()
    ).subscribe({
      next: () => this.emitOnAccept.emit(),
    });
  }

  handleOnError(event: HcaptchaErrorEvent): void {
    this.wrapAsObservable$(
      this._translateService.get('vsph.common.utils.unknowError')
    ).subscribe(message => (this.errorMessage = event.error || message));
  }
}
