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
import { actionSetViewedImageDetails } from '~/client-mod/store/actions';
import { selectImageViewerDetails } from '~/client-mod/store/selectors';
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

  viewerDetails?: FileAttachment;

  constructor(private readonly _store: Store<ClientReducer>) {
    super();
  }

  @HostListener('click', ['$event'])
  handleClick(event: Event) {
    if (this.imageViewer) {
      const clickedInside = this.imageViewer.nativeElement.contains(
        event.target
      );
      if (!clickedInside) {
        this._store.dispatch(
          actionSetViewedImageDetails({ details: undefined })
        );
      }
    }
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._store.select(selectImageViewerDetails)
    ).subscribe(viewerDetails => (this.viewerDetails = viewerDetails));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
