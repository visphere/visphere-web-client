/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { GuildService } from './guild.service';

describe('GuildService', () => {
  let service: GuildService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClientModule, SettingsModule],
    });
    service = TestBed.inject(GuildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});