/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { authWindowFadeAndMove } from '~/root-mod/modules/shared/animations/auth-window.animation';

@Component({
  selector: 'msph-auth-register-page',
  templateUrl: './auth-register-page.component.html',
  host: { class: 'flex-grow flex flex-col' },
  animations: [authWindowFadeAndMove],
})
export class AuthRegisterPageComponent {}
