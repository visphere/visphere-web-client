/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input } from '@angular/core';
import { SettingsCategory } from '~/settings-mod/types/settings-category.type';

@Component({
  selector: 'vsph-setting-panel-wrapper',
  templateUrl: './setting-panel-wrapper.component.html',
})
export class SettingPanelWrapperComponent {
  @Input() category: SettingsCategory = 'appSettings';
  @Input() subpage = '';
}
