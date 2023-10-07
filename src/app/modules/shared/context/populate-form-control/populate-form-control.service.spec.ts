/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { PopulateFormControlService } from './populate-form-control.service';

describe('PopulateFormControlService', () => {
  let service: PopulateFormControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopulateFormControlService],
    });
    service = TestBed.inject(PopulateFormControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
