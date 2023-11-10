/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '~/auth-mod/auth.module';
import { MfaEmailService } from '~/auth-mod/services/mfa-email/mfa-email.service';
import { AppModule } from '~/root-mod/app.module';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { MfaEmailFormComponent } from './mfa-email-form.component';

describe('MfaEmailFormComponent', () => {
  let component: MfaEmailFormComponent;
  let fixture: ComponentFixture<MfaEmailFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AuthModule],
      providers: [MfaEmailService, PopulateFormGroupService],
    }).compileComponents();
    fixture = TestBed.createComponent(MfaEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
