/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsEntryPointPageComponent } from '~/settings-mod/pages/settings-entry-point-page/settings-entry-point-page.component';
import { canActivateLoggedRoute } from '../shared/guard/logged-route/logged-route.guard';
import { SettingsRootComponent } from './settings-root.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsRootComponent,
    children: [
      {
        path: '',
        canActivate: [canActivateLoggedRoute],
        children: [
          {
            path: '',
            component: SettingsEntryPointPageComponent,
            title: 'settingsEntryPointPage',
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
