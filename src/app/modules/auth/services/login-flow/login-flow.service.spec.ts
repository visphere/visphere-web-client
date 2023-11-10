/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { AppModule } from '~/root-mod/app.module';
import { LoginFlowService } from './login-flow.service';

describe('LoginFlowService', () => {
  let service: LoginFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [LoginFlowService],
    });
    service = TestBed.inject(LoginFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
