/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { PasswordConfirmationService } from '~/shared-mod/services/password-confirmation/password-confirmation.service';
import { SphereGuildService } from '../sphere-guild/sphere-guild.service';
import { GuildBansService } from './guild-bans.service';

describe('GuildBansService', () => {
  let service: GuildBansService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [
        GuildBansService,
        SphereGuildService,
        PasswordConfirmationService,
      ],
    });
    service = TestBed.inject(GuildBansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
