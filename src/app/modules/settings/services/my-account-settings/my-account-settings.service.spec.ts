/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { MyAccountSettingsService } from './my-account-settings.service';

describe('MyAccountSettingsService', () => {
  let service: MyAccountSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [MyAccountSettingsService],
    });
    service = TestBed.inject(MyAccountSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
