/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';

@Component({
  selector: 'vsph-client-root',
  template: `
    <div class="flex-grow">
      <router-outlet></router-outlet>
    </div>
  `,
  host: { class: 'flex flex-col h-full' },
})
export class ClientRootComponent {}
