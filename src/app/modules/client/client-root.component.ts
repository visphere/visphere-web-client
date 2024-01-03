/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractReactiveProvider } from '../shared/utils/abstract-reactive-provider';
import { RoutePersistorService } from './services/route-persistor/route-persistor.service';

@Component({
  selector: 'vsph-client-root',
  template: `
    <vsph-image-viewer-modal />
    <div class="flex-grow">
      <router-outlet></router-outlet>
    </div>
  `,
  host: { class: 'flex flex-col h-full' },
  providers: [RoutePersistorService],
})
export class ClientRootComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  constructor(private readonly _routePersistorService: RoutePersistorService) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._routePersistorService.persistRoute$()
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
