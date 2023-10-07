/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { ResetPasswordService } from '~/auth-mod/services/reset-password/reset-password.service';
import { AppModule } from '~/root-mod/app.module';
import { StartResetPasswordService } from './start-reset-password.service';

describe('StartResetPasswordService', () => {
  let service: StartResetPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [ResetPasswordService, StartResetPasswordService],
    });
    service = TestBed.inject(StartResetPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
