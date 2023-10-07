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

export const dropboxFadeAndMove = trigger('dropboxFadeAndMove', [
  state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
  transition(':enter, :leave', [animate('200ms ease-in-out')]),
]);
