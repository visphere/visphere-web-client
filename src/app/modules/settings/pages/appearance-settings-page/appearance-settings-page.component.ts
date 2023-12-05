/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppearanceSettingsService } from '~/settings-mod/services/appearance-settings/appearance-settings.service';
import { RadioElement } from '~/settings-mod/types/radio-element.type';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-appearance-settings-page',
  templateUrl: './appearance-settings-page.component.html',
  providers: [AppearanceSettingsService],
})
export class AppearanceSettingsPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  isLoading$: Observable<boolean> = this._appearanceSettingsService.isLoading$;
  isFetching$: Observable<boolean> =
    this._appearanceSettingsService.isFetching$;

  appearanceData: RadioElement[] = [];
  definedValue = '';
  isSelected = false;

  readonly defaultPrefix =
    'vsph.clientCommon.settingsPage.category.appSettings.subpage';

  constructor(
    private readonly _appearanceSettingsService: AppearanceSettingsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable(
      this._appearanceSettingsService.loadAvailableThemes()
    ).subscribe(({ elements, definedValue, isSelected }) => {
      this.appearanceData = elements;
      this.definedValue = definedValue;
      this.isSelected = isSelected;
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleChangeAppearance(element: RadioElement): void {
    this._appearanceSettingsService.saveSelectedTheme(element);
    if (this.isSelected) {
      this.wrapAsObservable(
        this._appearanceSettingsService.persistRelatedTheme(
          element.id as string
        )
      ).subscribe({
        next: () => this._appearanceSettingsService.updateWsSignalValue(),
      });
    }
  }

  handleChangeRelateSetting(isRelated: boolean): void {
    this.isSelected = isRelated;
    this.wrapAsObservable(
      this._appearanceSettingsService.persistRelatedTheme(
        this.isSelected ? this.definedValue : null
      )
    ).subscribe({
      next: () => this._appearanceSettingsService.updateWsSignalValue(),
      error: () => (this.isSelected = !isRelated),
    });
  }
}
