/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { environment } from '~/env/environment';

@Component({
  selector: 'vsph-auth-login-page',
  templateUrl: './auth-login-page.component.html',
  host: { class: 'flex-grow flex flex-col' },
})
export class AuthLoginPageComponent {
  path = environment.contentDistributorBaseUrl;
  qrCode =
    'https://upload.wikimedia.org/wikipedia/commons/5/5e/QR_Code_example.png';
}
