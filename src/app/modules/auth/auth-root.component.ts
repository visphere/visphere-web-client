/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';

@Component({
  selector: 'vsph-auth-root',
  template: `
    <vsph-locked-account-modal />
    <div class="flex-grow flex flex-col h-full">
      <router-outlet />
    </div>
    <vsph-footer />
  `,
  host: { class: 'flex flex-col h-full min-h-screen' },
})
export class AuthRootComponent {}
