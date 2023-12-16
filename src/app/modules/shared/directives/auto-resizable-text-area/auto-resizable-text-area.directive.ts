/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({ selector: '[vsphAutoResizableTextArea]' })
export class AutoResizableTextAreaDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  @HostListener(':input')
  onInput(): void {
    this.resize();
  }

  ngOnInit(): void {
    if (this.elementRef.nativeElement.scrollHeight) {
      setTimeout(() => this.resize());
    }
  }

  resize(): void {
    this.elementRef.nativeElement.style.height = '0';
    this.elementRef.nativeElement.style.height =
      this.elementRef.nativeElement.scrollHeight + 2 + 'px';
  }
}
