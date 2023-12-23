/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { environment } from '~/env/environment';
import { AbstractReactiveProvider } from '../utils/abstract-reactive-provider';

export abstract class AbstractResizableProvider extends AbstractReactiveProvider {
  private _trigger = 0;

  isAnimationDisabled = this.triggerDisableAnimation();
  readonly path = environment.contentDistributorBaseUrl;

  constructor(trigger: number) {
    super();
    this._trigger = trigger;
  }

  protected triggerDisableAnimation() {
    return window.innerWidth < this._trigger;
  }
}
