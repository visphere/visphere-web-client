/*
 * Copyright (c) 2024 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { AppModule } from '~/root-mod/app.module';
import { MessageFilesService } from './message-files.service';

describe('MessageFilesService', () => {
  let service: MessageFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
      providers: [MessageFilesService],
    });
    service = TestBed.inject(MessageFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
