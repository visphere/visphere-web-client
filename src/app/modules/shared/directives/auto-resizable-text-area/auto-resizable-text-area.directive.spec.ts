/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ElementRef, inject } from '@angular/core';
import { AutoResizableTextAreaDirective } from './auto-resizable-text-area.directive';

describe('AutoResizableTextAreaDirective', () => {
  it('should create an instance', () => {
    const elementRef = inject(ElementRef);
    const directive = new AutoResizableTextAreaDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
