/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { environment } from '~/env/environment';

@Component({
  selector: 'msph-auth-content-wrapper',
  templateUrl: './auth-content-wrapper.component.html',
  host: { class: 'flex-grow flex flex-col h-full' },
})
export class AuthContentWrapperComponent {
  path = environment.contentDistributorBaseUrl;
}
