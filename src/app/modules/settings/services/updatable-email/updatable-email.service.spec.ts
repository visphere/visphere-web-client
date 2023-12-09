/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { UpdatableEmailService } from './updatable-email.service';

describe('UpdatableEmailService', () => {
  let service: UpdatableEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [UpdatableEmailService],
    });
    service = TestBed.inject(UpdatableEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
