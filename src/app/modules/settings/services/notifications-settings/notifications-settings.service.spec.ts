/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { NotificationsSettingsService } from './notifications-settings.service';

describe('NotificationsSettingsService', () => {
  let service: NotificationsSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [NotificationsSettingsService],
    });
    service = TestBed.inject(NotificationsSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
