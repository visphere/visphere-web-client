/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: shared.module.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 01:49:02
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
import { PasswordStrengthMeterComponent } from '~/shared-mod/components/password-strength-meter/password-strength-meter.component';
import { NotFoundPageComponent } from '~/shared-mod/pages/not-found-page/not-found-page.component';
import { SanitizePipe } from '~/shared-mod/pipes/sanitize/sanitize.pipe';

@NgModule({
  declarations: [
    // components
    PasswordStrengthMeterComponent,
    // pages
    NotFoundPageComponent,
    // directives
    // pipes
    SanitizePipe,
  ],
  imports: [CommonModule],
  exports: [PasswordStrengthMeterComponent, SanitizePipe],
})
export class SharedModule {}
