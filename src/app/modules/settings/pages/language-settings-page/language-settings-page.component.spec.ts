/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { LanguageSettingsService } from '~/settings-mod/services/language-settings/language-settings.service';
import { SettingsModule } from '~/settings-mod/settings.module';
import { LanguageSettingsPageComponent } from './language-settings-page.component';

describe('LanguageSettingsPageComponent', () => {
  let component: LanguageSettingsPageComponent;
  let fixture: ComponentFixture<LanguageSettingsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [LanguageSettingsService],
    }).compileComponents();
    fixture = TestBed.createComponent(LanguageSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
