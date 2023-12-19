/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { DevastateAccountService } from '~/settings-mod/services/devastate-account/devastate-account.service';
import { MyAccountSettingsService } from '~/settings-mod/services/my-account-settings/my-account-settings.service';
import { PasswordConfirmationService } from '~/settings-mod/services/password-confirmation/password-confirmation.service';
import { SettingsModule } from '~/settings-mod/settings.module';
import { DevastateAccountModalComponent } from './devastate-account-modal.component';

describe('DevastateAccountModalComponent', () => {
  let component: DevastateAccountModalComponent;
  let fixture: ComponentFixture<DevastateAccountModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [
        MyAccountSettingsService,
        DevastateAccountService,
        PasswordConfirmationService,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DevastateAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
