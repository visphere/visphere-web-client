/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { DatetimeFormatterPipe } from './datetime-formatter.pipe';

describe('DatetimeFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new DatetimeFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
