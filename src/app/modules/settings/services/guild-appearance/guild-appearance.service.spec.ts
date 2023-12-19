/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { GuildAppearanceService } from './guild-appearance.service';

describe('GuildAppearanceService', () => {
  let service: GuildAppearanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [GuildAppearanceService],
    });
    service = TestBed.inject(GuildAppearanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
