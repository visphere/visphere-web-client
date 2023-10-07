/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { lazyPageLoaderFade } from '~/shared-mod/animations/lazy-page-loader.animation';
import { LazyPageLoaderService } from '~/shared-mod/services/lazy-page-loader/lazy-page-loader.service';

@Component({
  selector: 'vsph-lazy-page-loader',
  templateUrl: './lazy-page-loader.component.html',
  animations: [lazyPageLoaderFade],
})
export class LazyPageLoaderComponent {
  isVisible$: Observable<boolean> =
    this._lazyPageLoaderService.lazyLoaderIsVisible$;

  satellites: string[] = [
    'vsph-page-loader__satellite--first',
    'vsph-page-loader__satellite--second',
    'vsph-page-loader__satellite--third',
  ];

  constructor(
    private location: Location,
    private readonly _lazyPageLoaderService: LazyPageLoaderService
  ) {}

  url(id: string): string {
    return `url(${this.location.path()}${id})`;
  }
}
