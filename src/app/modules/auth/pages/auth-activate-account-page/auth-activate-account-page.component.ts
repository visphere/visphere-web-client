/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { authWindowFadeAndMove } from '~/shared-mod/animations/auth-window.animation';

@Component({
  selector: 'msph-auth-activate-account-page',
  templateUrl: './auth-activate-account-page.component.html',
  host: { class: 'flex-grow flex flex-col' },
  animations: [authWindowFadeAndMove],
})
export class AuthActivateAccountPageComponent {}
