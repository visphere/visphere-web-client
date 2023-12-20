/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { PasswordConfirmationService } from '../password-confirmation/password-confirmation.service';
import { SphereGuildService } from '../sphere-guild/sphere-guild.service';
import { GuildOverviewService } from './guild-overview.service';

describe('GuildOverviewService', () => {
  let service: GuildOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [
        GuildOverviewService,
        SphereGuildService,
        PasswordConfirmationService,
      ],
    });
    service = TestBed.inject(GuildOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
