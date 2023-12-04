/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { AppearanceSettingsService } from '~/settings-mod/services/appearance-settings/appearance-settings.service';
import { SettingsModule } from '~/settings-mod/settings.module';
import { AppearanceSettingsPageComponent } from './appearance-settings-page.component';

describe('AppearanceSettingsPageComponent', () => {
  let component: AppearanceSettingsPageComponent;
  let fixture: ComponentFixture<AppearanceSettingsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [AppearanceSettingsService],
    }).compileComponents();
    fixture = TestBed.createComponent(AppearanceSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
