/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: client.module.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 01:45:45
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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ClientRootComponent } from '~/client-mod/client-root.component';
import { ClientRoutingModule } from '~/client-mod/client-routing.module';
import { ClientEntryPointPageComponent } from '~/client-mod/pages/client-entry-point-page/client-entry-point-page.component';

@NgModule({
  declarations: [
    // components
    // pages
    ClientEntryPointPageComponent,
    // root page
    ClientRootComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ClientRoutingModule,
    TranslateModule,
    FormsModule,
  ],
})
export class ClientModule {}
