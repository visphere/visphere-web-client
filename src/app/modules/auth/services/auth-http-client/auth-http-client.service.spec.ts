/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { AuthHttpClientService } from './auth-http-client.service';

describe('AuthHttpServiceService', () => {
  let service: AuthHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
    });
    service = TestBed.inject(AuthHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
