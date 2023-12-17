/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { MyAccountSettingsService } from '~/settings-mod/services/my-account-settings/my-account-settings.service';
import { PasswordConfirmationService } from '~/settings-mod/services/password-confirmation/password-confirmation.service';
import { SettingsModule } from '~/settings-mod/settings.module';
import { PopulateTooltipService } from '~/shared-mod/context/populate-tooltip/populate-tooltip.service';
import { AccountAuthSettingsComponent } from './account-auth-settings.component';

describe('AccountAuthSettingsComponent', () => {
  let component: AccountAuthSettingsComponent;
  let fixture: ComponentFixture<AccountAuthSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [
        MyAccountSettingsService,
        PopulateTooltipService,
        PasswordConfirmationService,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AccountAuthSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
