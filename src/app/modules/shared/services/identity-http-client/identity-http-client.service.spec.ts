/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { IdentityHttpClientService } from './identity-http-client.service';

describe('IdentityHttpClientService', () => {
  let service: IdentityHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(IdentityHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
