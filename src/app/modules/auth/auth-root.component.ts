/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';

@Component({
  selector: 'msph-auth-root',
  template: `
    <div class="flex-grow flex flex-col h-full">
      <router-outlet />
    </div>
    <msph-footer />
  `,
  host: { class: 'flex flex-col h-full min-h-screen' },
})
export class AuthRootComponent {}
