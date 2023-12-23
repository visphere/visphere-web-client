/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, HostListener, Input } from '@angular/core';
import { windowFadeAndMove } from '~/shared-mod/animations/window.animation';
import { AbstractResizableProvider } from '~/shared-mod/components/abstract-resizable.provider';

@Component({
  selector: 'vsph-auth-content-wrapper',
  templateUrl: './auth-content-wrapper.component.html',
  host: { class: 'flex-grow flex flex-col h-full' },
  animations: [windowFadeAndMove],
})
export class AuthContentWrapperComponent extends AbstractResizableProvider {
  @Input() size: 'sm' | 'md' | 'xl' = 'sm';

  constructor() {
    super(768);
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.isAnimationDisabled = this.triggerDisableAnimation();
  }
}
