/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
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
