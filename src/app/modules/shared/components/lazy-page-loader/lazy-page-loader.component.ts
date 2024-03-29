/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { environment } from '~/env/environment';
import { lazyPageLoaderFade } from '~/shared-mod/animations/lazy-page-loader.animation';
import { LazyPageLoaderService } from '~/shared-mod/services/lazy-page-loader/lazy-page-loader.service';

@Component({
  selector: 'vsph-lazy-page-loader',
  templateUrl: './lazy-page-loader.component.html',
  animations: [lazyPageLoaderFade],
})
export class LazyPageLoaderComponent {
  isVisible$ = this._lazyPageLoaderService.lazyLoaderIsVisible$;

  readonly path = environment.contentDistributorBaseUrl;

  constructor(private readonly _lazyPageLoaderService: LazyPageLoaderService) {}
}
