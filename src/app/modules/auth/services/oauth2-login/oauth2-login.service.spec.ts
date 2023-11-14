/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { Oauth2LoginService } from './oauth2-login.service';

describe('Oauth2LoginService', () => {
  let service: Oauth2LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [Oauth2LoginService],
    });
    service = TestBed.inject(Oauth2LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
