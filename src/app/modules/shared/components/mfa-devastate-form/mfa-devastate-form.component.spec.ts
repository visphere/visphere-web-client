/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { PopulateFormGroupService } from '~/shared-mod/context/populate-form-group/populate-form-group.service';
import { PasswordConfirmationService } from '~/shared-mod/services/password-confirmation/password-confirmation.service';
import { MfaDevastateFormComponent } from './mfa-devastate-form.component';

describe('MfaDevastateFormComponent', () => {
  let component: MfaDevastateFormComponent;
  let fixture: ComponentFixture<MfaDevastateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [PasswordConfirmationService, PopulateFormGroupService],
    }).compileComponents();
    fixture = TestBed.createComponent(MfaDevastateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
