/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { Oauth2HttpClientService } from './oauth2-http-client.service';

describe('Oauth2HttpClientService', () => {
  let service: Oauth2HttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Oauth2HttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
