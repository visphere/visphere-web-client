/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { GuildBansHttpClientService } from './guild-bans-http-client.service';

describe('GuildBansHttpClientService', () => {
  let service: GuildBansHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
    });
    service = TestBed.inject(GuildBansHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
