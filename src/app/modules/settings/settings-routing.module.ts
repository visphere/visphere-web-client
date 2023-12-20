/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppearanceSettingsPageComponent } from '~/settings-mod/pages/appearance-settings-page/appearance-settings-page.component';
import { BlankInitSettingsPageComponent } from '~/settings-mod/pages/blank-init-settings-page/blank-init-settings-page.component';
import { GuildAppearanceSettingsPageComponent } from '~/settings-mod/pages/guild-appearance-settings-page/guild-appearance-settings-page.component';
import { GuildBansSettingsPageComponent } from '~/settings-mod/pages/guild-bans-settings-page/guild-bans-settings-page.component';
import { GuildJoinLinksSettingsPageComponent } from '~/settings-mod/pages/guild-join-links-settings-page/guild-join-links-settings-page.component';
import { GuildOverviewSettingsPageComponent } from '~/settings-mod/pages/guild-overview-settings-page/guild-overview-settings-page.component';
import { GuildSettingsEntryPointPageComponent } from '~/settings-mod/pages/guild-settings-entry-point-page/guild-settings-entry-point-page.component';
import { LanguageSettingsPageComponent } from '~/settings-mod/pages/language-settings-page/language-settings-page.component';
import { MyAccountSettingsPageComponent } from '~/settings-mod/pages/my-account-settings-page/my-account-settings-page.component';
import { NotificationsSettingsPageComponent } from '~/settings-mod/pages/notifications-settings-page/notifications-settings-page.component';
import { ProfileSettingsPageComponent } from '~/settings-mod/pages/profile-settings-page/profile-settings-page.component';
import { SettingsEntryPointPageComponent } from '~/settings-mod/pages/settings-entry-point-page/settings-entry-point-page.component';
import { TextChannelOverviewSettingsPageComponent } from '~/settings-mod/pages/text-channel-overview-settings-page/text-channel-overview-settings-page.component';
import { TextChannelSettingsEntryPointPageComponent } from '~/settings-mod/pages/text-channel-settings-entry-point-page/text-channel-settings-entry-point-page.component';
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
          {
            path: 'guild/:guildId',
            component: GuildSettingsEntryPointPageComponent,
            title: 'guildSettingsEntryPointPage',
            children: [
              {
                path: 'overview',
                component: GuildOverviewSettingsPageComponent,
                title: 'settingsPage.overview',
              },
              {
                path: 'appearance',
                component: GuildAppearanceSettingsPageComponent,
                title: 'settingsPage.appearance',
              },
              {
                path: 'join-links',
                component: GuildJoinLinksSettingsPageComponent,
                title: 'settingsPage.joinLinks',
              },
              {
                path: 'bans',
                component: GuildBansSettingsPageComponent,
                title: 'settingsPage.bans',
              },
              { path: '', redirectTo: 'overview', pathMatch: 'full' },
            ],
          },
          {
            path: 'guild/:guildId/text-channel/:textChannelId',
            component: TextChannelSettingsEntryPointPageComponent,
            title: 'textChannelSettingsEntryPointPage',
            children: [
              {
                path: 'overview',
                component: TextChannelOverviewSettingsPageComponent,
                title: 'settingsPage.overview',
              },
              { path: '', redirectTo: 'overview', pathMatch: 'full' },
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
