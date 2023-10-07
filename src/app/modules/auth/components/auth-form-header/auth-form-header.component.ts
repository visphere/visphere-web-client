/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input } from '@angular/core';
import { environment } from '~/env/environment';

@Component({
  selector: 'vsph-auth-form-header',
  templateUrl: './auth-form-header.component.html',
})
export class AuthFormHeaderComponent {
  @Input() i18nPrefix = '';
  path = environment.contentDistributorBaseUrl;
}
