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

export const authWindowFadeAndMove = trigger('authWindowFadeAndMove', [
  state(
    'void',
    style({ opacity: 0, transform: 'translateY(-40px) scale(.95)' })
  ),
  transition(':enter, :leave', [animate('400ms cubic-bezier(.14,.94,0,.98)')]),
]);
