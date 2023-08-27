/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: footer-control-list.component.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 21:00:16
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { dropboxFadeAndMove } from '~/root-mod/modules/shared/animations/dropbox.animation';

@Component({
  selector: 'msph-footer-control-list',
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
