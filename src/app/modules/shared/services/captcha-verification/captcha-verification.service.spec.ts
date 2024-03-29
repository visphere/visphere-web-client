/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { CaptchaVerificationService } from './captcha-verification.service';

describe('CaptchaVerificationService', () => {
  let service: CaptchaVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [CaptchaVerificationService],
    });
    service = TestBed.inject(CaptchaVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
