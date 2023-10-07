/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { PasswordStrengthMeterService } from './password-strength-meter.service';

describe('PasswordStrengthMeterService', () => {
  let service: PasswordStrengthMeterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordStrengthMeterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
