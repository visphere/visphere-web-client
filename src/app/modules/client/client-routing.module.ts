/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 * Silesian University of Technology
 *
 *    File name: client-routing.module.ts
 *    Last modified: 7/4/23, 4:01 PM
 *    Project name: moonsphere
 *    Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This is a project completing a
 * engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientRootComponent } from '~/client-mod/client-root.component';

import { ClientEntryPointPageComponent } from '~/client-mod/pages/client-entry-point-page/client-entry-point-page.component';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const routes: Routes = [
  {
    path: '',
    component: ClientRootComponent,
    children: [
      {
        path: '',
        component: ClientEntryPointPageComponent,
        title: 'clientEntryPointPage',
      },
    ],
  },
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
