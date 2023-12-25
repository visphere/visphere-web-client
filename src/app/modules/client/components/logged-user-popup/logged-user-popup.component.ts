/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxFloatUiContentComponent } from 'ngx-float-ui';
import { AbstractIconThemeProvider } from '~/shared-mod/components/abstract-icon-theme.provider';
import { LoggedUser } from '~/shared-mod/models/logged-user.model';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';
import * as NgrxAction_SHA from '~/shared-mod/store/actions';
import * as NgrxSelector_SHA from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';

@Component({
  selector: 'vsph-logged-user-popup',
  templateUrl: './logged-user-popup.component.html',
})
export class LoggedUserPopupComponent
  extends AbstractIconThemeProvider
  implements OnInit, OnDestroy
{
  @Input() loggedUserDetailsPopup?: NgxFloatUiContentComponent;

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
    this.wrapAsObservable$(
      this._store.select(NgrxSelector_SHA.selectLoggedUser)
    ).subscribe(loggedUser => (this.loggedUser = loggedUser ?? undefined));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  async handleGotoSettings(): Promise<void> {
    this._store.dispatch(
      NgrxAction_SHA.__setSettingsReturnUrl({ url: this._router.url })
    );
    await this._router.navigateByUrl('settings');
  }

  handleOpenLogoutModal(): void {
    this._store.dispatch(
      NgrxAction_SHA.__updateLogoutModalState({ isOpen: true })
    );
    this.loggedUserDetailsPopup?.hide();
  }
}
