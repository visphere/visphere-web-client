/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';

@Component({
  selector: 'vsph-settings-root',
  template: ` <router-outlet></router-outlet> `,
  host: { class: 'flex flex-col flex-grow min-h-screen' },
})
export class SettingsRootComponent {}
