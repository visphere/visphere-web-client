/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { GuildManagementHttpClientService } from './guild-management-http-client.service';

describe('GuildManagementHttpClientService', () => {
  let service: GuildManagementHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
    });
    service = TestBed.inject(GuildManagementHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
