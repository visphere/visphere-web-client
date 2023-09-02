/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: izomorphic-loader.component.ts
 *   Created at: 2023-09-02, 01:32:14
 *   Last updated at: 2023-09-02, 01:32:15
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
import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'msph-izomorphic-loader',
  templateUrl: './izomorphic-loader.component.html',
})
export class IzomorphicLoaderComponent {
  @Input() size?: 'small' | 'large' = 'large';
  @Input() color?: 'device' | 'tint' = 'device';

  satellites: string[] = [
    'msph-page-loader__satellite--first',
    'msph-page-loader__satellite--second',
    'msph-page-loader__satellite--third',
  ];

  constructor(private location: Location) {}

  url(id: string): string {
    if (this.color === 'tint') {
      return '';
    }
    return `url(${this.location.path()}${id})`;
  }
}
