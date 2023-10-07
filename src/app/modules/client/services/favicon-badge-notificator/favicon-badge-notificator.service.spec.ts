/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { FaviconBadgeNotificatorService } from './favicon-badge-notificator.service';

describe('FaviconBadgeNotificatorService', () => {
  let service: FaviconBadgeNotificatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaviconBadgeNotificatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
