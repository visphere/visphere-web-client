/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { ProfileSettingsService } from './profile-settings.service';

describe('ProfileSettingsService', () => {
  let service: ProfileSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [ProfileSettingsService],
    });
    service = TestBed.inject(ProfileSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
