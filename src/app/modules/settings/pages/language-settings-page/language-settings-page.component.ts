/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageSettingsService } from '~/settings-mod/services/language-settings/language-settings.service';
import { RadioElement } from '~/settings-mod/types/radio-element.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-language-settings-page',
  templateUrl: './language-settings-page.component.html',
  providers: [LanguageSettingsService],
})
export class LanguageSettingsPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  isLoading$ = this._languageSettingsService.isLoading$;
  isFetching$ = this._languageSettingsService.isFetching$;

  languageData: RadioElement[] = [];
  definedValue = '';
  isSelected = false;

  readonly defaultPrefix =
    'vsph.clientCommon.settingsPage.category.appSettings.subpage';

  constructor(
    private readonly _languageSettingsService: LanguageSettingsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._languageSettingsService.loadAvailableLanguages$()
    ).subscribe(({ elements, definedValue, isSelected }) => {
      this.languageData = elements;
      this.definedValue = definedValue;
      this.isSelected = isSelected;
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleChangeLanguage(element: RadioElement): void {
    this._languageSettingsService.saveSelectedLang(element);
    if (this.isSelected) {
      this.wrapAsObservable$(
        this._languageSettingsService.persistRelatedLanguage$(
          element.id as string
        )
      ).subscribe({
        next: () => this._languageSettingsService.updateWsSignalValue(),
      });
    } else {
      this._languageSettingsService.updateWsSignalValue();
    }
  }

  handleChangeRelateSetting(isRelated: boolean): void {
    this.isSelected = isRelated;
    this.wrapAsObservable$(
      this._languageSettingsService.persistRelatedLanguage$(
        this.isSelected ? this.definedValue : null
      )
    ).subscribe({
      next: () => this._languageSettingsService.updateWsSignalValue(),
      error: () => (this.isSelected = !isRelated),
    });
  }
}
