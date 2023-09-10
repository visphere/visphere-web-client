/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { lazyPageLoaderFade } from '../../animations/lazy-page-loader.animation';
import { LazyPageLoaderService } from '../../services/lazy-page-loader/lazy-page-loader.service';

@Component({
  selector: 'msph-lazy-page-loader',
  templateUrl: './lazy-page-loader.component.html',
  animations: [lazyPageLoaderFade],
})
export class LazyPageLoaderComponent {
  isVisible$: Observable<boolean> =
    this._lazyPageLoaderService.lazyLoaderIsVisible$;

  constructor(private readonly _lazyPageLoaderService: LazyPageLoaderService) {}
}
