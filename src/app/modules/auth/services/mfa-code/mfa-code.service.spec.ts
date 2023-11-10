/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { MfaCodeService } from './mfa-code.service';

describe('MfaCodeService', () => {
  let service: MfaCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [MfaCodeService],
    });
    service = TestBed.inject(MfaCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
