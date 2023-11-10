/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsEntryPointPageComponent } from '~/settings-mod/pages/settings-entry-point-page/settings-entry-point-page.component';
import { SettingsRootComponent } from './settings-root.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [SettingsEntryPointPageComponent, SettingsRootComponent],
  imports: [
    CommonModule,
    RouterModule,
    SettingsRoutingModule,
    TranslateModule,
    FormsModule,
  ],
})
export class SettingsModule {}
