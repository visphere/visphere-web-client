/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';

@Component({
  selector: 'msph-mount',
  template: `
    <msph-lazy-page-loader />
    <msph-snackbars-container />
    <div class="flex flex-col flex-grow">
      <router-outlet></router-outlet>
    </div>
  `,
  host: { class: 'flex flex-col h-full min-h-screen' },
})
export class AppRootComponent {}
