/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { MyAccountSettingsService } from '~/settings-mod/services/my-account-settings/my-account-settings.service';
import { SettingsModule } from '~/settings-mod/settings.module';
import { PopulateTooltipService } from '~/shared-mod/context/populate-tooltip/populate-tooltip.service';
import { AccountPanelSettingsComponent } from './account-panel-settings.component';

describe('AccountPanelSettingsComponent', () => {
  let component: AccountPanelSettingsComponent;
  let fixture: ComponentFixture<AccountPanelSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [MyAccountSettingsService, PopulateTooltipService],
    }).compileComponents();
    fixture = TestBed.createComponent(AccountPanelSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
