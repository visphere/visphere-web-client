/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { ActivateAccountService } from './activate-account.service';

describe('ActivateAccountService', () => {
  let service: ActivateAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [ActivateAccountService],
    });
    service = TestBed.inject(ActivateAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
