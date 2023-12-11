/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { UnlockAccountService } from './unlock-account.service';

describe('UnlockAccountService', () => {
  let service: UnlockAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [UnlockAccountService],
    });
    service = TestBed.inject(UnlockAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
