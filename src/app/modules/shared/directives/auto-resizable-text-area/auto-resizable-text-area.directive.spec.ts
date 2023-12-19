/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ElementRef, inject } from '@angular/core';
import { AutoResizableTextAreaDirective } from './auto-resizable-text-area.directive';

describe('AutoResizableTextAreaDirective', () => {
  const elementRef = inject(ElementRef);

  it('should create an instance', () => {
    const directive = new AutoResizableTextAreaDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
