/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { DevastateAccountHttpClientService } from './devastate-account-http-client.service';

describe('DevastateAccountHttpClientService', () => {
  let service: DevastateAccountHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
    });
    service = TestBed.inject(DevastateAccountHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
