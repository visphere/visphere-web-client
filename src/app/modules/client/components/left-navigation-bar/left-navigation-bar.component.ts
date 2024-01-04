/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxFloatUiContentComponent } from 'ngx-float-ui';
import { NgxTippyProps } from 'ngx-tippy-wrapper';
import { UserGuildResDto } from '~/client-mod/model/guild.model';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { actionOpenSelectedModal } from '~/client-mod/store/actions';
import { ClientReducer } from '~/client-mod/types/ngx-store.type';
import { AbstractLandingUrlProvider } from '~/shared-mod/components/abstract-landing-url.provider';
import { LoggedUser } from '~/shared-mod/models/logged-user.model';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';
import { selectLoggedUser } from '~/shared-mod/store/selectors';
import { SharedReducer } from '~/shared-mod/types/ngrx-store.type';
import { floatUiConfig } from '~/shared-mod/utils/float-ui.config';

@Component({
  selector: 'vsph-left-navigation-bar',
  templateUrl: './left-navigation-bar.component.html',
})
export class LeftNavigationBarComponent
  extends AbstractLandingUrlProvider
  implements OnInit, OnDestroy
{
  @ViewChild('loggedUserDetails', { static: false })
  loggedUserDetailsPopup?: NgxFloatUiContentComponent;

  loggedUser?: LoggedUser;
  userGuilds: UserGuildResDto[] = [];

  selectedLang$ = this._languageSwitcherService.selectedLang$;

  readonly defaultPrefix = 'vsph.clientCommon.client';
  readonly floatUiStyles = floatUiConfig.floatUiStyles;
  readonly tooltipProps: NgxTippyProps = {
    placement: 'right',
    theme: 'vsph-auth',
    animation: 'scale-subtle',
  };

  constructor(
    private readonly _store: Store<SharedReducer | ClientReducer>,
    private readonly _languageSwitcherService: LanguageSwitcherService,
    private readonly _guildService: GuildService,
    private readonly _router: Router,
    _themeSwitcherService: ThemeSwitcherService
  ) {
    super(_themeSwitcherService, _languageSwitcherService);
  }

  ngOnInit(): void {
    this.loadLandingUrl();
    this.loadBrandThemedIcon();
    this.wrapAsObservable$(this._store.select(selectLoggedUser)).subscribe(
      loggedUser => (this.loggedUser = loggedUser ?? undefined)
    );
    this.wrapAsObservable$(this._guildService.getAllUserGuilds$()).subscribe(
      guilds => (this.userGuilds = guilds)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleOpenAddSphereModal(): void {
    this._store.dispatch(actionOpenSelectedModal({ modal: 'add-sphere' }));
  }

  handleClosePopup(): void {
    this.loggedUserDetailsPopup?.hide();
  }

  createGuildRoute(guild: UserGuildResDto): string {
    return `/guild/${guild.id}`;
  }

  isActiveRoute(path: string, isExact: boolean): boolean {
    return this._router.isActive(path, {
      paths: isExact ? 'exact' : 'subset',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }
}
