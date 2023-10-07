/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { ResetPasswordService } from '~/auth-mod/services/reset-password/reset-password.service';
import { AppModule } from '~/root-mod/app.module';
import { FinishResetPasswordService } from './finish-reset-password.service';

describe('FinishResetPasswordService', () => {
  let service: FinishResetPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [ResetPasswordService, FinishResetPasswordService],
    });
    service = TestBed.inject(FinishResetPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
