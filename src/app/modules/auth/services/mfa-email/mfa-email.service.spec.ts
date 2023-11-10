/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { MfaEmailService } from './mfa-email.service';

describe('MfaEmailService', () => {
  let service: MfaEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [MfaEmailService],
    });
    service = TestBed.inject(MfaEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
