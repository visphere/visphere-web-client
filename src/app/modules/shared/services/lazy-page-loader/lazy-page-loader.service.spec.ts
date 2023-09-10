/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { LazyPageLoaderService } from './lazy-page-loader.service';

describe('LazyPageLoaderService', () => {
  let service: LazyPageLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(LazyPageLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
