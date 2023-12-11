/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppearanceSettingsPageComponent } from '~/settings-mod/pages/appearance-settings-page/appearance-settings-page.component';
import { BlankInitSettingsPageComponent } from '~/settings-mod/pages/blank-init-settings-page/blank-init-settings-page.component';
import { LanguageSettingsPageComponent } from '~/settings-mod/pages/language-settings-page/language-settings-page.component';
import { MyAccountSettingsPageComponent } from '~/settings-mod/pages/my-account-settings-page/my-account-settings-page.component';
import { NotificationsSettingsPageComponent } from '~/settings-mod/pages/notifications-settings-page/notifications-settings-page.component';
import { ProfileSettingsPageComponent } from '~/settings-mod/pages/profile-settings-page/profile-settings-page.component';
import { SettingsEntryPointPageComponent } from '~/settings-mod/pages/settings-entry-point-page/settings-entry-point-page.component';
import { canActivateLoggedRoute } from '~/shared-mod/guard/logged-route/logged-route.guard';
import { SettingsRootComponent } from './settings-root.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsRootComponent,
    children: [
      {
        path: '',
        canActivate: [canActivateLoggedRoute],
        runGuardsAndResolvers: 'always',
        children: [
          {
            path: '',
            component: SettingsEntryPointPageComponent,
            title: 'settingsEntryPointPage',
            children: [
              {
                path: '',
                component: BlankInitSettingsPageComponent,
                title: 'settingsEntryPointPage',
              },
              {
                path: 'my-account',
                component: MyAccountSettingsPageComponent,
                title: 'settingsPage.myAccount',
              },
              {
                path: 'profile',
                component: ProfileSettingsPageComponent,
                title: 'settingsPage.profile',
              },
              {
                path: 'appearance',
                component: AppearanceSettingsPageComponent,
                title: 'settingsPage.appearance',
              },
              {
                path: 'notifications',
                component: NotificationsSettingsPageComponent,
                title: 'settingsPage.notifications',
              },
              {
                path: 'language',
                component: LanguageSettingsPageComponent,
                title: 'settingsPage.language',
              },
            ],
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
