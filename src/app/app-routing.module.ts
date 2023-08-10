/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: app-routing.module.ts
 *   Created at: 2023-08-06, 18:55:39
 *   Last updated at: 2023-08-10, 02:45:05
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This is a project
 * completing a engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '~/shared-mod/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/client/client.module').then(m => m.ClientModule),
  },
  { path: 'login', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'register', redirectTo: 'auth/register', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  { path: '**', component: NotFoundPageComponent, title: 'notFoundPage' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
