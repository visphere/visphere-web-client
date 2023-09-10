/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { AppendLangHeaderInterceptor } from './append-lang-header.interceptor';

describe('AppendLangHeaderInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [AppendLangHeaderInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: AppendLangHeaderInterceptor = TestBed.inject(
      AppendLangHeaderInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
