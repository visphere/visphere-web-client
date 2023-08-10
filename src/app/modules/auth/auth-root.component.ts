/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 * Silesian University of Technology
 *
 *    File name: auth-root.component.ts
 *    Last modified: 7/4/23, 3:44 PM
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

import { Component } from '@angular/core';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'msph-auth-root',
  template: `
    <div class="flex-grow flex flex-col h-full">
      <router-outlet></router-outlet>
    </div>
    <msph-footer></msph-footer>
  `,
  host: { class: 'flex flex-col h-full min-h-screen' },
})
export class AuthRootComponent {}
