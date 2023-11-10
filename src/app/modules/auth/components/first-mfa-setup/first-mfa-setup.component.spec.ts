/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { MfaFirstSetupService } from '~/auth-mod/services/mfa-first-setup/mfa-first-setup.service';
import { AppModule } from '~/root-mod/app.module';
import { FirstMfaSetupComponent } from './first-mfa-setup.component';

describe('FirstMfaSetupComponent', () => {
  let component: FirstMfaSetupComponent;
  let fixture: ComponentFixture<FirstMfaSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [MfaFirstSetupService],
    }).compileComponents();
    fixture = TestBed.createComponent(FirstMfaSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
