/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { AppModule } from '~/root-mod/app.module';
import { RoutePersistorService } from './route-persistor.service';

describe('RoutePersistorService', () => {
  let service: RoutePersistorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
      providers: [RoutePersistorService],
    });
    service = TestBed.inject(RoutePersistorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
