/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { AppModule } from '~/root-mod/app.module';
import { MessagesHttpClientService } from './messages-http-client.service';

describe('MessagesHttpClientService', () => {
  let service: MessagesHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
    });
    service = TestBed.inject(MessagesHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
