/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { PasswordConfirmationService } from '~/shared-mod/services/password-confirmation/password-confirmation.service';
import { DevastateAccountService } from './devastate-account.service';

describe('DevastateAccountService', () => {
  let service: DevastateAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [PasswordConfirmationService, DevastateAccountService],
    });
    service = TestBed.inject(DevastateAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
