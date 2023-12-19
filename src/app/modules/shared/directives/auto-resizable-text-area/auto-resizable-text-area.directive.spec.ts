/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AutoResizableTextAreaDirective } from './auto-resizable-text-area.directive';

export class MockElementRef extends ElementRef {
  override nativeElement = {};
}

describe('AutoResizableTextAreaDirective', () => {
  let elementRef: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useClass: MockElementRef }],
    });
    elementRef = TestBed.inject(ElementRef);
  });

  it('should create an instance', () => {
    const directive = new AutoResizableTextAreaDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
