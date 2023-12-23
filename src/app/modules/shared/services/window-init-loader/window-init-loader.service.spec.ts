/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { WindowInitLoaderService } from './window-init-loader.service';

describe('WindowInitLoaderService', () => {
  let service: WindowInitLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(WindowInitLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});