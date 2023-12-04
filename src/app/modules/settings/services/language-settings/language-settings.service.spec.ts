/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { LanguageSettingsService } from './language-settings.service';

describe('LanguageSettingsService', () => {
  let service: LanguageSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [LanguageSettingsService],
    });
    service = TestBed.inject(LanguageSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
