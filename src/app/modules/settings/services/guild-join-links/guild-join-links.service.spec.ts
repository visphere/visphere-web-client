/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { PasswordConfirmationService } from '~/shared-mod/services/password-confirmation/password-confirmation.service';
import { SphereGuildService } from '../sphere-guild/sphere-guild.service';
import { GuildJoinLinksService } from './guild-join-links.service';

describe('GuildJoinLinksService', () => {
  let service: GuildJoinLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [
        GuildJoinLinksService,
        SphereGuildService,
        PasswordConfirmationService,
      ],
    });
    service = TestBed.inject(GuildJoinLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
