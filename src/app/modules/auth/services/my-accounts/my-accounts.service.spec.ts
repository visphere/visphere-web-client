/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { MyAccountsService } from './my-accounts.service';

describe('MyAccountsService', () => {
  let service: MyAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [MyAccountsService],
    });
    service = TestBed.inject(MyAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
