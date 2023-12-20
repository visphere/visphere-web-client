/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { GuildOverviewService } from '~/settings-mod/services/guild-overview/guild-overview.service';
import { PasswordConfirmationService } from '~/settings-mod/services/password-confirmation/password-confirmation.service';
import { SphereGuildService } from '~/settings-mod/services/sphere-guild/sphere-guild.service';
import { SettingsModule } from '~/settings-mod/settings.module';
import { GuildOverviewSettingsPageComponent } from './guild-overview-settings-page.component';

describe('GuildOverviewSettingsPageComponent', () => {
  let component: GuildOverviewSettingsPageComponent;
  let fixture: ComponentFixture<GuildOverviewSettingsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [
        PasswordConfirmationService,
        SphereGuildService,
        GuildOverviewService,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(GuildOverviewSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
