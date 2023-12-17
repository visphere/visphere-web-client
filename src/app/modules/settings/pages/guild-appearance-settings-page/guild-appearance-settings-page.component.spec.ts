/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { GuildAppearanceService } from '~/settings-mod/services/guild-appearance/guild-appearance.service';
import { SettingsModule } from '~/settings-mod/settings.module';
import { GuildAppearanceSettingsPageComponent } from './guild-appearance-settings-page.component';

describe('GuildAppearanceSettingsPageComponent', () => {
  let component: GuildAppearanceSettingsPageComponent;
  let fixture: ComponentFixture<GuildAppearanceSettingsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [GuildAppearanceService],
    }).compileComponents();
    fixture = TestBed.createComponent(GuildAppearanceSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
