/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SharedHttpClientService } from './shared-http-client.service';

describe('SharedHttpClientService', () => {
  let service: SharedHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(SharedHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
