/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input, OnInit } from '@angular/core';
import { PopulateTooltipService } from '~/shared-mod/context/populate-tooltip/populate-tooltip.service';
import { LanguageSwitcherService } from '~/shared-mod/services/language-switcher/language-switcher.service';
import { ThemeSwitcherService } from '~/shared-mod/services/theme-switcher/theme-switcher.service';
import { AbstractIconThemeProvider } from '../abstract-icon-theme-provider';

@Component({
  selector: 'vsph-joined-date',
  templateUrl: './joined-date.component.html',
})
export class JoinedDateComponent
  extends AbstractIconThemeProvider
  implements OnInit
{
  @Input() joinDateStr = '';

  selectedLang$ = this._languageSwitcherService.selectedLang$;
  tooltipProps$ = this._populateTooltipService.field$;

  constructor(
    _themeSwitcherService: ThemeSwitcherService,
    private readonly _languageSwitcherService: LanguageSwitcherService,
    private readonly _populateTooltipService: PopulateTooltipService
  ) {
    super(_themeSwitcherService);
  }

  ngOnInit(): void {
    this.loadBrandThemedIcon();
  }
}
