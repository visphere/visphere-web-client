/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { GuildJoinLinksService } from '~/settings-mod/services/guild-join-links/guild-join-links.service';
import { PasswordConfirmationService } from '~/settings-mod/services/password-confirmation/password-confirmation.service';
import { SphereGuildService } from '~/settings-mod/services/sphere-guild/sphere-guild.service';
import { SettingsModule } from '~/settings-mod/settings.module';
import { GuildJoinLinksSettingsPageComponent } from './guild-join-links-settings-page.component';

describe('GuildJoinLinksSettingsPageComponent', () => {
  let component: GuildJoinLinksSettingsPageComponent;
  let fixture: ComponentFixture<GuildJoinLinksSettingsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [
        GuildJoinLinksService,
        SphereGuildService,
        PasswordConfirmationService,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(GuildJoinLinksSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
