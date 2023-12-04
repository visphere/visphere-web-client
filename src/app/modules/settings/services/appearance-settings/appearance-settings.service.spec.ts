/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { AppearanceSettingsService } from './appearance-settings.service';

describe('AppearanceSettingsService', () => {
  let service: AppearanceSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [AppearanceSettingsService],
    });
    service = TestBed.inject(AppearanceSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
