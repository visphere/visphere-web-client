/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { MfaHttpClientService } from './mfa-http-client.service';

describe('MfaHttpClientService', () => {
  let service: MfaHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
    });
    service = TestBed.inject(MfaHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
