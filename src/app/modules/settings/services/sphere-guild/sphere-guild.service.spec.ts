/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { PasswordConfirmationService } from '../password-confirmation/password-confirmation.service';
import { SphereGuildService } from './sphere-guild.service';

describe('SphereGuildService', () => {
  let service: SphereGuildService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [PasswordConfirmationService],
    });
    service = TestBed.inject(SphereGuildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
