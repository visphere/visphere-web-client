/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { FillDataService } from './fill-data.service';

describe('FillDataService', () => {
  let service: FillDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [FillDataService],
    });
    service = TestBed.inject(FillDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
