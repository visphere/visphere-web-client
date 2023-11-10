/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { MfaFirstSetupService } from './mfa-first-setup.service';

describe('MfaDataService', () => {
  let service: MfaFirstSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [MfaFirstSetupService],
    });
    service = TestBed.inject(MfaFirstSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
