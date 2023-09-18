/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { GlobalExceptionHandlerInterceptor } from './global-exception-handler.interceptor';

describe('GlobalExceptionHandlerInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [GlobalExceptionHandlerInterceptor],
      imports: [AppModule],
    })
  );

  it('should be created', () => {
    const interceptor: GlobalExceptionHandlerInterceptor = TestBed.inject(
      GlobalExceptionHandlerInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
