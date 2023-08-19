/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: auth-window.animation.ts
 *   Created at: 2023-08-19, 22:59:35
 *   File name: auth-window.animation.ts
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
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
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const authWindowFadeAndMove = trigger('authWindowFadeAndMove', [
  state(
    'void',
    style({ opacity: 0, transform: 'translateY(-40px) scale(.95)' })
  ),
  transition(':enter, :leave', [animate('400ms cubic-bezier(.14,.94,0,.98)')]),
]);
