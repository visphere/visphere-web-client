/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { DevastateAccountService } from '~/settings-mod/services/devastate-account/devastate-account.service';
import { SettingsModule } from '~/settings-mod/settings.module';
import { MfaDevastateFormComponent } from './mfa-devastate-form.component';

describe('MfaDevastateFormComponent', () => {
  let component: MfaDevastateFormComponent;
  let fixture: ComponentFixture<MfaDevastateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [DevastateAccountService],
    }).compileComponents();
    fixture = TestBed.createComponent(MfaDevastateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});