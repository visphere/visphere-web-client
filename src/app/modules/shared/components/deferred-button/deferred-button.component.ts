/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
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

  @Output() emitOnAction = new EventEmitter<void>();

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
