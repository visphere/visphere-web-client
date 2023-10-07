/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { MyAccountsCredentialsService } from './my-accounts-credentials.service';

describe('MyAccountsCredentialsService', () => {
  let service: MyAccountsCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [MyAccountsCredentialsService],
    });
    service = TestBed.inject(MyAccountsCredentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
