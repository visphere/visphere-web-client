/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { PopulateTooltipService } from './populate-tooltip.service';

describe('PopulateTooltipService', () => {
  let service: PopulateTooltipService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [PopulateTooltipService],
    });
    service = TestBed.inject(PopulateTooltipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
