/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const windowFadeAndMove = trigger('windowFadeAndMove', [
  state(
    'void',
    style({ opacity: 0, transform: 'translateY(-40px) scale(.95)' })
  ),
  transition(':enter, :leave', [animate('400ms cubic-bezier(.14,.94,0,.98)')]),
]);
