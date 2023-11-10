/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CdTimerComponent } from 'angular-cd-timer';

@Component({
  selector: 'vsph-deferred-button',
  templateUrl: './deferred-button.component.html',
})
export class DeferredButtonComponent implements OnInit, OnDestroy {
  @Input() styles = '';
  @Input() innerI18nText = '';
  @Input() labelI18nText = '';
  @Input() deferTimeSec = 30;
  @Input() isLoading = false;
  @Input() isDisabled = false;
  @Input() enabledOnMount = true;
  @Input() color: 'modal' | 'dark' | '' = '';

  @ViewChild('timerEntry') timerEntry?: CdTimerComponent;

  @Output() emitOnAction = new EventEmitter<void>();

  isDeferred = false;
  currentTime = this.deferTimeSec;

  ngOnInit(): void {
    if (this.enabledOnMount) {
      this.isDeferred = true;
    }
  }

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
