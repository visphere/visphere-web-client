/*
 * Copyright (c) 2024 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { FileAttachment } from '~/client-mod/model/message.model';
import * as NgrxAction_CLN from '~/client-mod/store/actions';
import * as NgrxSelector_CLN from '~/client-mod/store/selectors';
import { ClientReducer } from '~/client-mod/types/ngx-store.type';
import { windowFadeAndMove } from '~/shared-mod/animations/window.animation';
import { AbstractReactiveProvider } from '~/shared-mod/utils/abstract-reactive-provider';

@Component({
  selector: 'vsph-image-viewer-modal',
  templateUrl: './image-viewer-modal.component.html',
  animations: [windowFadeAndMove],
})
export class ImageViewerModalComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @ViewChild('imageViewer') imageViewer?: ElementRef;

  viewerDetails: FileAttachment | null = null;

  constructor(private readonly _store: Store<ClientReducer>) {
    super();
  }

  @HostListener('click', ['$event'])
  handleClick(event: Event) {
    if (this.imageViewer) {
      const clickedInside = this.imageViewer.nativeElement.contains(
        event.target
      );
      console.log(clickedInside);
      if (!clickedInside) {
        this._store.dispatch(
          NgrxAction_CLN.__setViewedImageDetails({ details: null })
        );
      }
    }
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._store.select(NgrxSelector_CLN.selectImageViewerDetails)
    ).subscribe(viewerDetails => (this.viewerDetails = viewerDetails));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
