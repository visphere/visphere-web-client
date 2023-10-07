/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';

@Component({
  selector: 'vsph-mount',
  template: `
    <vsph-lazy-page-loader />
    <vsph-snackbars-container />
    <div class="flex flex-col flex-grow">
      <router-outlet></router-outlet>
    </div>
  `,
  host: { class: 'flex flex-col h-full min-h-screen' },
})
export class AppRootComponent {}
