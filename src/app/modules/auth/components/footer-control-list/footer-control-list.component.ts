/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { dropboxFadeAndMove } from '~/shared-mod/animations/dropbox.animation';

@Component({
  selector: 'vsph-footer-control-list',
  templateUrl: './footer-control-list.component.html',
  host: { class: 'relative' },
  animations: [dropboxFadeAndMove],
})
export class FooterControlListComponent {
  @ViewChild('selectViewHolder') selectViewHolder!: ElementRef;

  isOpen = false;

  onToggleVisibility(): void {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOnDocument(event: MouseEvent): void {
    const clickedInside = this.selectViewHolder.nativeElement.contains(
      event.target
    );
    if (!clickedInside) {
      this.isOpen = false;
    }
  }
}
