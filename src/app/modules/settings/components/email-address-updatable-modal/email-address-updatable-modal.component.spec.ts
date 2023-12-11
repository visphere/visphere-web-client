/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { MyAccountSettingsService } from '~/settings-mod/services/my-account-settings/my-account-settings.service';
import { SettingsModule } from '~/settings-mod/settings.module';
import { EmailAddressUpdatableModalComponent } from './email-address-updatable-modal.component';

describe('EmailAddressUpdatableModalComponent', () => {
  let component: EmailAddressUpdatableModalComponent;
  let fixture: ComponentFixture<EmailAddressUpdatableModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [MyAccountSettingsService],
    }).compileComponents();
    fixture = TestBed.createComponent(EmailAddressUpdatableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
