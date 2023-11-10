/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { AccessRefreshInterceptor } from './access-refresh.interceptor';

describe('AccessRefreshInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [AccessRefreshInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: AccessRefreshInterceptor = TestBed.inject(
      AccessRefreshInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
