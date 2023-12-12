/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { SettingsModule } from '~/settings-mod/settings.module';
import { PopulateTooltipService } from '~/shared-mod/context/populate-tooltip/populate-tooltip.service';
import { UserAccountBannerComponent } from './user-account-banner.component';

describe('UserAccountBannerComponent', () => {
  let component: UserAccountBannerComponent;
  let fixture: ComponentFixture<UserAccountBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [PopulateTooltipService],
    }).compileComponents();
    fixture = TestBed.createComponent(UserAccountBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
