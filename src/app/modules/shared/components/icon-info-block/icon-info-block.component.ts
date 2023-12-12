/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input } from '@angular/core';
import { environment } from '~/env/environment';

@Component({
  selector: 'vsph-icon-info-block',
  templateUrl: './icon-info-block.component.html',
})
export class IconInfoBlockComponent {
  @Input() i18nText = '';

  readonly path = environment.contentDistributorBaseUrl;
}
