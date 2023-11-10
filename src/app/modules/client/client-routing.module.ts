/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientRootComponent } from '~/client-mod/client-root.component';
import { ClientEntryPointPageComponent } from '~/client-mod/pages/client-entry-point-page/client-entry-point-page.component';
import { canActivateLoggedRoute } from '../shared/guard/logged-route/logged-route.guard';

const routes: Routes = [
  {
    path: '',
    component: ClientRootComponent,
    children: [
      {
        path: '',
        canActivate: [canActivateLoggedRoute],
        children: [
          {
            path: '',
            component: ClientEntryPointPageComponent,
            title: 'clientEntryPointPage',
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
