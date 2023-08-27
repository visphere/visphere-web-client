/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: deferred-button.component.ts
 *   Created at: 2023-08-25, 20:36:33
 *   Last updated at: 2023-08-25, 20:36:34
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
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { CdTimerComponent } from 'angular-cd-timer';

@Component({
  selector: 'msph-deferred-button',
  templateUrl: './deferred-button.component.html',
})
export class DeferredButtonComponent implements OnDestroy {
  @Input() styles = '';
  @Input() innerI18nText = '';
  @Input() labelI18nText = '';
  @Input() deferTimeSec = 30;
  @Input() isLoading = false;
  @Input() isDisabled = false;

  @ViewChild('timerEntry') timerEntry?: CdTimerComponent;

  @Output() emitOnAction: EventEmitter<void> = new EventEmitter<void>();

  isDeferred = false;
  currentTime = this.deferTimeSec;

  ngOnDestroy(): void {
    this.timerEntry?.reset();
  }

  handleButtonClick(): void {
    if (this.isDeferred) {
      return;
    }
    this.emitOnAction.emit();
    this.isDeferred = true;
    this.timerEntry?.start();
  }

  handleResetDeferredTime(): void {
    this.isDeferred = false;
    this.timerEntry?.reset();
  }
}
