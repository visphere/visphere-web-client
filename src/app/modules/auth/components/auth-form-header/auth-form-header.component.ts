/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, Input } from '@angular/core';
import { environment } from '~/env/environment';

@Component({
  selector: 'msph-auth-form-header',
  templateUrl: './auth-form-header.component.html',
})
export class AuthFormHeaderComponent {
  @Input() i18nPrefix = '';
  path = environment.contentDistributorBaseUrl;
}
