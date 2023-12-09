/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { DateFormatterPipe } from './date-formatter.pipe';

describe('DateFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new DateFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
