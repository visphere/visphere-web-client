/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { LanguageSwitcherService } from './language-switcher.service';

describe('LanguageSwitcherService', () => {
  let service: LanguageSwitcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
    service = TestBed.inject(LanguageSwitcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
