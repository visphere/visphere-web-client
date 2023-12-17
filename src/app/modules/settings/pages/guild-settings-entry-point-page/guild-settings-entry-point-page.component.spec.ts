/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { PasswordConfirmationService } from '~/settings-mod/services/password-confirmation/password-confirmation.service';
import { SphereGuildService } from '~/settings-mod/services/sphere-guild/sphere-guild.service';
import { SettingsModule } from '~/settings-mod/settings.module';
import { GuildSettingsEntryPointPageComponent } from './guild-settings-entry-point-page.component';

describe('GuildSettingsEntryPointPageComponent', () => {
  let component: GuildSettingsEntryPointPageComponent;
  let fixture: ComponentFixture<GuildSettingsEntryPointPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [PasswordConfirmationService, SphereGuildService],
    }).compileComponents();
    fixture = TestBed.createComponent(GuildSettingsEntryPointPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
