/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input } from '@angular/core';
import { environment } from '~/env/environment';

@Component({
  selector: 'vsph-socials-horizontal',
  templateUrl: './socials-horizontal.component.html',
  host: { class: 'col-span-12 lg:col-span-4 ms-2.5 flex' },
})
export class SocialsHorizontalComponent {
  @Input() size: 'sm' | 'xl' = 'xl';

  path = environment.contentDistributorBaseUrl;

  get iconSize(): string {
    return this.size === 'xl' ? '25px' : '15px';
  }
}
