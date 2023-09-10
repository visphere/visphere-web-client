/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const lazyPageLoaderFade = trigger('lazyPageLoaderFade', [
  state('void', style({ opacity: 0 })),
  state('*', style({ opacity: 1 })),
  transition(':leave', animate('400ms ease-in')),
]);
