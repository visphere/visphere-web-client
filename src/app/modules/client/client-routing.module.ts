/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientRootComponent } from '~/client-mod/client-root.component';
import { AppEntryPointPageComponent } from '~/client-mod/pages/app-entry-point-page/app-entry-point-page.component';
import { ClientEntryPointPageComponent } from '~/client-mod/pages/client-entry-point-page/client-entry-point-page.component';
import { JoinToGuildPageComponent } from '~/client-mod/pages/join-to-guild-page/join-to-guild-page.component';
import { SphereGuildEntryPageComponent } from '~/client-mod/pages/sphere-guild-entry-page/sphere-guild-entry-page.component';
import { SphereGuildPageComponent } from '~/client-mod/pages/sphere-guild-page/sphere-guild-page.component';
import { SphereTextChannelPageComponent } from '~/client-mod/pages/sphere-text-channel-page/sphere-text-channel-page.component';
import { canActivateLoggedRoute } from '../shared/guard/logged-route/logged-route.guard';

const routes: Routes = [
  {
    path: '',
    component: ClientRootComponent,
    children: [
      {
        path: '',
        canActivate: [canActivateLoggedRoute],
        runGuardsAndResolvers: 'always',
        children: [
          {
            path: '',
            component: ClientEntryPointPageComponent,
            title: 'clientEntryPointPage',
            children: [
              {
                path: '',
                component: AppEntryPointPageComponent,
                title: 'clientEntryPointPage',
              },
              {
                path: 'guild/:guildId',
                component: SphereGuildPageComponent,
                title: 'clientSphereGuildPage',
                children: [
                  {
                    path: '',
                    component: SphereGuildEntryPageComponent,
                    title: 'clientSphereGuildPage',
                  },
                  {
                    path: 'channel/:textChannelId',
                    component: SphereTextChannelPageComponent,
                    title: 'clientSphereTextChannelPage',
                  },
                ],
              },
            ],
          },
          {
            path: 'join/:token',
            component: JoinToGuildPageComponent,
            title: 'clientJoinToGuildPage',
          },
          {
            path: 'join/public/:guildId',
            component: JoinToGuildPageComponent,
            title: 'clientJoinToGuildPage',
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
export class ClientRoutingModule {}
