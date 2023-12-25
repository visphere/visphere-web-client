/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { PasswordConfirmationService } from './password-confirmation.service';

describe('PasswordConfirmationService', () => {
  let service: PasswordConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [PasswordConfirmationService],
    });
    service = TestBed.inject(PasswordConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
