/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { AppModule } from '~/root-mod/app.module';
import { JoinLinkHttpClientService } from './join-link-http-client.service';

describe('JoinLinkHttpClientService', () => {
  let service: JoinLinkHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
    }).compileComponents();
    service = TestBed.inject(JoinLinkHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
