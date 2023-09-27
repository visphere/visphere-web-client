/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, HostListener, Input } from '@angular/core';
import { environment } from '~/env/environment';
import { authWindowFadeAndMove } from '~/shared-mod/animations/auth-window.animation';

@Component({
  selector: 'msph-auth-content-wrapper',
  templateUrl: './auth-content-wrapper.component.html',
  host: { class: 'flex-grow flex flex-col h-full' },
  animations: [authWindowFadeAndMove],
})
export class AuthContentWrapperComponent {
  @Input() size: 'sm' | 'xl' = 'sm';

  path = environment.contentDistributorBaseUrl;
  isAnimationDisabled = this.triggerDisableAnimation();

  @HostListener('window:resize')
  onWindowResize() {
    this.isAnimationDisabled = this.triggerDisableAnimation();
  }

  private triggerDisableAnimation() {
    return window.innerWidth <= 768;
  }
}
