/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { AppModule } from '~/root-mod/app.module';
import { JoinLinkService } from './join-link.service';

describe('JoinLinkService', () => {
  let service: JoinLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
      providers: [JoinLinkService],
    }).compileComponents();
    service = TestBed.inject(JoinLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
