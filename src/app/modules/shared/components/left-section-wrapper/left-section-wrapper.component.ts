/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { windowFadeAndMove } from '~/shared-mod/animations/window.animation';
import { WindowInitLoaderService } from '~/shared-mod/services/window-init-loader/window-init-loader.service';
import { AbstractResizableProvider } from '../abstract-resizable.provider';

@Component({
  selector: 'vsph-left-section-wrapper',
  templateUrl: './left-section-wrapper.component.html',
  host: { class: 'relative w-full min-h-screen' },
  animations: [windowFadeAndMove],
})
export class LeftSectionWrapperComponent
  extends AbstractResizableProvider
  implements OnInit, OnDestroy
{
  isVisible = false;

  constructor(
    private readonly _windowInitLoaderService: WindowInitLoaderService
  ) {
    super(640);
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._windowInitLoaderService.postponedAnimationTrigger$()
    ).subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.isAnimationDisabled = this.triggerDisableAnimation();
  }
}
