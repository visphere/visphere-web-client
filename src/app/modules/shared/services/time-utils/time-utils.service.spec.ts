/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { TimeUtilsService } from './time-utils.service';

describe('TimeUtilsService', () => {
  let service: TimeUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
