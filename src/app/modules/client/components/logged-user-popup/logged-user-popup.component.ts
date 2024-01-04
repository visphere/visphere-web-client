/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AbstractIconThemeProvider } from '~/shared-mod/components/abstract-icon-theme.provider';
import { LoggedUser } from '~/shared-mod/models/logged-user.model';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';
import {
  actionSetSettingsReturnUrl,
  actionUpdateLogoutModalState,
} from '~/shared-mod/store/actions';
import { selectLoggedUser } from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

@Component({
  selector: 'vsph-logged-user-popup',
  templateUrl: './logged-user-popup.component.html',
})
export class LoggedUserPopupComponent
  extends AbstractIconThemeProvider
  implements OnInit, OnDestroy
{
  @Output() emitOnClosePopup = new EventEmitter<void>();

  loggedUser?: LoggedUser;

  selectedLang$ = this._languageSwitcherService.selectedLang$;

  readonly defaultPrefix = 'vsph.clientCommon.client';

  constructor(
    private readonly _store: Store<SharedReducer>,
    private readonly _languageSwitcherService: LanguageSwitcherService,
    private readonly _router: Router,
    _themeSwitcherService: ThemeSwitcherService
  ) {
    super(_themeSwitcherService);
  }

  ngOnInit(): void {
    this.loadBrandThemedIcon();
    this.wrapAsObservable$(this._store.select(selectLoggedUser)).subscribe(
      loggedUser => (this.loggedUser = loggedUser ?? undefined)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  async handleGotoSettings(): Promise<void> {
    this._store.dispatch(actionSetSettingsReturnUrl({ url: this._router.url }));
    await this._router.navigateByUrl('settings');
  }

  handleOpenLogoutModal(): void {
    this._store.dispatch(actionUpdateLogoutModalState({ isOpen: true }));
    this.emitOnClosePopup.emit();
  }
}
